<template>
	<div class="page-header clear-filter" filter-color="orange">
		<div
			class="page-header-image"
			style="background-image: url('img/home1.jpg')"
		></div>
		<div class="content">
			<div class="container">
				<div class="col-md-5 ml-auto mr-auto">
					<form @submit.prevent="register">
						<card type="login" plain>
							<!-- <div slot="header" class="logo-container">
								 <img v-lazy="'img/now-logo.png'" alt="" />
							   </div> -->
							<h1>Register</h1>
							<fg-input
								class="no-border input-lg"
								addon-left-icon="now-ui-icons users_single-02"
								placeholder="First Name..."
								type="text"
								v-model="first_name"
								required
							>
							</fg-input>
						
							<fg-input
								class="no-border input-lg"
								addon-left-icon="now-ui-icons users_single-02"
								placeholder="Last Name..."
								type="text"
								v-model="last_name"
								required
							>
							</fg-input>
						
							<fg-input
								class="no-border input-lg"
								addon-left-icon="now-ui-icons ui-1_email-85"
								placeholder="Email..."
								type="email"
								v-model="email"
								required
							>
							</fg-input>
						
							<fg-input
								class="no-border input-lg"
								addon-left-icon="now-ui-icons tech_mobile"
								placeholder="Phone..."
								type="number"
								v-model="phone"
								required
							>
							</fg-input>
						
							<fg-input
								class="no-border input-lg"
								addon-left-icon="now-ui-icons ui-1_lock-circle-open"
								placeholder="Password..."
								type="password"
								v-model="password"
								required
							>
							</fg-input>
						
							<template slot="raw-content">
								<div class="card-footer text-center">
									<button
										type="submit"
										class="btn btn-round btn-primary btn-lg btn-block"
									>
										Register
									</button>
								</div>
								<div class="pull-left">
									<h6>
										<router-link to="/login" class="link footer-link"
											>Already have Account!!</router-link
										>
									</h6>
								</div>
							</template>
						</card>
					</form>
				</div>
			</div>
		</div>
		<main-footer></main-footer>
	</div>
</template>
<script>
import { Card, Button, FormGroupInput } from "@/components";
import MainFooter from "@/layout/MainFooter";
export default {
	name: "register-page",
	bodyClass: "login-page",
	components: {
		Card,
		MainFooter,
		[Button.name]: Button,
		[FormGroupInput.name]: FormGroupInput,
	},
	data: function () {
		return {
			first_name: "",
			last_name: "",
			email: "",
			phone: "",
			password: "",
			roles: ["user"],
		};
	},
	methods: {
		register: function () {
			let data = {
				first_name: this.first_name,
				last_name: this.last_name,
				email: this.email,
				phone: this.phone,
				password: this.password,
				roles: this.user_type,
			};
			this.$store
				.dispatch("register", data)
				.then(() => this.$router.push("/login"))
				.catch((err) => this.$toast.error(err.response.data.message, "Error"));
		},
	},
};
</script>

<style>
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
	-webkit-appearance: none;
	margin: 0;
}

/* Firefox */
input[type="number"] {
	-moz-appearance: textfield;
}

input[type="number" i] {
	background-color: rgba(255, 255, 255, 0.1);
}

</style>
