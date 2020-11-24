<template>
	<div>
		<div class="section">
			<div class="container">
				<div class="row">
					<div class="col-md-8 ml-auto mr-auto">
						<h4 class="title text-center">Update Profile</h4>
					</div>
					<div class="col-md-12 ml-auto mr-auto text-center">
						<el-form
							:model="form"
							ref="form"
							:rules="rules"
							status-icon
							label-position="left"
						>
							<div class="row">
								<div class="col-md-6">
									<el-form-item
										prop="first_name"
										label="First Name"
										:label-width="formLabelWidth"
									>
										<el-input v-model="form.first_name"></el-input>
									</el-form-item>
								</div>
								<div class="col-md-6">
									<el-form-item
										prop="last_name"
										label="Last Name"
										:label-width="formLabelWidth"
									>
										<el-input v-model="form.last_name"></el-input>
									</el-form-item>
								</div>
								<div class="col-md-6">
									<el-form-item
										label="Email"
										prop="email"
										:label-width="formLabelWidth"
									>
										<el-input
											type="email"
											v-model.number="form.email"
											autocomplete="off"
											:disabled="true"
										></el-input>
									</el-form-item>
								</div>
								<div class="col-md-6">
									<el-form-item
										label="Phone"
										prop="phone"
										:label-width="formLabelWidth"
									>
										<el-input
											type="number"
											v-model.number="form.phone"
											autocomplete="off"
										></el-input>
									</el-form-item>
								</div>
							</div>
						</el-form>

						<el-button
							type="primary"
							@click="submitForm('form')"
							:loading="loading"
							>{{ loading ? "Submitting ..." : "Submit" }}</el-button
						>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { Button, FormGroupInput } from "@/components";
import axios from "axios";

export default {
	name: "editprofile",
	bodyClass: "edit-profile-page",
	components: {
		[Button.name]: Button,
		[FormGroupInput.name]: FormGroupInput,
	},
	data: function () {
		return {
			user: {},
			loading: false,
			form: {
				first_name: "",
				last_name: "",
				email: "",
				phone: "",
			},
			formLabelWidth: "150px",
			rules: {
				first_name: [
					{
						required: true,
						message: "Please Input First Name",
						trigger: "blur",
					},
				],
				last_name: [
					{
						required: true,
						message: "Please Input Last Name",
						trigger: "blur",
					},
				],
				email: [
					{
						required: true,
						message: "Please Input Email",
						trigger: "blur",
					},
				],
				phone: [
					{
						required: true,
						message: "Please Input Phone",
						trigger: "blur",
					},
					{
						type: "number",
						message: "Phone should be number",
					},
				],
			},
		};
	},
	created: async function () {
		await this.fetchUser();
	},
	methods: {
		fetchUser: async function (e) {
			await axios({
				url: "http://localhost:8080/api/profile",
				method: "GET",
			})
				.then((resp) => {
					this.user = resp.data;
					this.form.first_name = this.user.first_name;
					this.form.last_name = this.user.last_name;
					this.form.email = this.user.email;
					this.form.phone = parseInt(this.user.phone);
				})
				.catch((err) =>
					this.$toast.error(err.response.data.message.message, "Error")
				);
		},
		async submitForm(formName) {
			this.loading = true;
			await this.$refs[formName].validate(async (valid) => {
				if (valid) {
					await axios({
						url: "http://localhost:8080/api/profile",
						data: this.form,
						method: "PATCH",
					})
						.then((resp) => {
							this.$store.dispatch("user_update", this.form.first_name);
							this.$router.push("/profile");
						})
						.catch((err) =>
							this.$toast.error(err.response.data.message, "Error")
						);
				} else {
					this.$toast.error("Please Check Input", "Error");
				}
			});
			this.loading = false;
		},
	},
};
</script>
<style>
</style>
