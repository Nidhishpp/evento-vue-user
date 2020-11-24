<template>
	<div>
		<div class="page-header page-header-small">
			<parallax
				class="page-header-image"
				:style="{ 'background-image': 'url(' + event.image + ')' }"
			>
			</parallax>
			<div class="content-center">
				<div class="container">
					<h1 class="title">{{ event.title }}</h1>
				</div>
			</div>
		</div>
		<div class="section">
			<div class="container">
				<div class="row">
					<div class="col-md-8 ml-auto mr-auto text-center">
						<el-carousel :interval="4000" type="card" height="250px">
							<el-carousel-item v-for="img in event.gallery" :key="img">
								<img class="d-block" :src="img" :alt="img" />
							</el-carousel-item>
						</el-carousel>
					</div>
				</div>
			</div>
		</div>
		<div class="section pt-0">
			<div class="container">
				<div class="row">
					<div class="col-md-8 ml-auto mr-auto text-center">
						<h5 class="description">
							{{ event.description }}
						</h5>
					</div>
				</div>
			</div>
		</div>
		<div class="section pricing-table pt-0 text-center">
			<div class="container">
				<h2 class="title">Want to work with us?</h2>
				<p class="description">Your project is very important to us.</p>
				<div class="row">
					<div
						class="col-md-4"
						v-for="packages in event.packages"
						:key="packages.title"
					>
						<div class="card">
							<h6 class="type">{{ packages.title }}</h6>
							<div class="price" :data-price="'₹' + packages.price">
								<span>₹</span>{{ packages.price }}
							</div>
							<h5 class="plan">plan</h5>
							<ul class="details">
								<li v-for="feature in packages.features" :key="feature">
									{{ feature }}
								</li>
							</ul>
							<div class="buy-button">
								<n-button
									v-if="isLoggedIn"
									type="neutral"
									@click="drawerOpen(packages)"
									class="plan-btn"
									block
									>Sounds good!</n-button
								>
								<router-link
									v-else
									class="btn plan-btn btn-block btn-neutral"
									to="/login"
								>
									Sounds good!
								</router-link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<el-drawer
			title="I am the title"
			:visible.sync="drawer"
			:before-close="handleClose"
			:with-header="false"
		>
			<div class="section">
				<div class="container">
					<el-form
						:model="form"
						ref="form"
						:rules="rules"
						status-icon
						label-position="left"
					>
						<el-form-item
							prop="event"
							label="Event"
							:label-width="formLabelWidth"
						>
							<el-input v-model="form.event_name" :disabled="true"></el-input>
						</el-form-item>
						<el-form-item
							prop="package"
							label="Package"
							:label-width="formLabelWidth"
							:disabled="true"
						>
							<el-input v-model="form.package_name" :disabled="true"></el-input>
						</el-form-item>
						<el-form-item
							label="Address Line 1"
							prop="address_line_1"
							:label-width="formLabelWidth"
						>
							<el-input
								type="address_line_1"
								v-model.number="form.address_line_1"
								autocomplete="off"
							></el-input>
						</el-form-item>
						<el-form-item
							label="Address Line 2"
							prop="address_line_2"
							:label-width="formLabelWidth"
						>
							<el-input
								type="address_line_2"
								v-model.number="form.address_line_2"
								autocomplete="off"
							></el-input>
						</el-form-item>
						<el-form-item
							label="City"
							prop="city"
							:label-width="formLabelWidth"
						>
							<el-input
								type="city"
								v-model.number="form.city"
								autocomplete="off"
							></el-input>
						</el-form-item>
						<el-form-item
							label="State"
							prop="state"
							:label-width="formLabelWidth"
						>
							<el-select
								v-model="form.state"
								filterable
								placeholder="Select"
								class="w-100"
							>
								<el-option
									v-for="state in states"
									:key="state.name"
									:label="state.name"
									:value="state.name"
								>
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item
							label="Pincode"
							prop="pincode"
							:label-width="formLabelWidth"
						>
							<el-input
								type="pincode"
								v-model.number="form.pincode"
								autocomplete="off"
							></el-input>
						</el-form-item>
						<el-form-item label="Date" :label-width="formLabelWidth" required>
							<el-date-picker
								v-model="form.date"
								type="daterange"
								start-placeholder="Start date"
								end-placeholder="End date"
								:default-time="['00:00:00', '23:59:59']"
								:picker-options="pickerOptions"
							>
							</el-date-picker>
						</el-form-item>
						<el-form-item
							label="Approx. Count"
							:label-width="formLabelWidth"
							required
						>
							<el-input-number
								v-model="form.approx_count"
								controls-position="right"
								:min="10"
								:max="5000"
								class="w-100"
							></el-input-number>
						</el-form-item>
						<el-form-item
							label="Hall Needed?"
							:label-width="formLabelWidth"
							required
						>
							<el-switch
								v-model="form.hall"
								active-color="#13ce66"
								inactive-color="#ff4949"
							>
							</el-switch>
						</el-form-item>
						<el-form-item
							label="Additional Message"
							prop="message"
							:label-width="formLabelWidth"
						>
							<el-input
								type="message"
								v-model.number="form.message"
								autocomplete="off"
							></el-input>
						</el-form-item>
					</el-form>
					<p>
						* This is just an extimate. We will contract you with more details
					</p>
					<div class="demo-drawer__footer text-center">
						<el-button @click="handleClose">Cancel</el-button>
						<el-button
							type="primary"
							@click="submitForm('form')"
							:loading="loading"
							>{{ loading ? "Submitting ..." : "Submit" }}</el-button
						>
					</div>
				</div>
			</div>
		</el-drawer>
	</div>
</template>
<script>
import { Button, FormGroupInput } from "@/components";
import axios from "axios";
export default {
	name: "event",
	bodyClass: "event-page",
	components: {
		[Button.name]: Button,
		[FormGroupInput.name]: FormGroupInput,
	},
	data() {
		return {
			event: {},
			drawer: false,
			loading: false,
			form: {
				event_name: "",
				event: "",
				package_name: "",
				package: "",
				address_line_1: "",
				address_line_2: "",
				city: "",
				state: "",
				pincode: "",
				date: "",
				approx_count: "",
				hall: false,
				message: "NIL",
			},
			pickerOptions: {
				disabledDate(time) {
					return time.getTime() < Date.now();
				},
			},
			formLabelWidth: "150px",
			timer: null,
			rules: {
				address_line_1: [
					{
						required: true,
						message: "Please Provide address",
						trigger: "blur",
					},
				],
				address_line_2: [
					{
						required: true,
						message: "Please Provide address",
						trigger: "blur",
					},
				],
				city: [
					{
						required: true,
						message: "Please Provide City",
						trigger: "blur",
					},
				],
				state: [
					{
						required: true,
						message: "Please Provide State",
						trigger: "blur",
					},
				],
				pincode: [
					{ required: true, message: "Pincode is required" },
					{ type: "number", message: "Pincode must be a number" },
				],
				date: [
					{
						required: true,
						message: "Please Input Start and End Date",
						trigger: "blur",
					},
				],
				approx_count: [
					{
						required: true,
						message: "Please Input Approximate Count",
						trigger: "blur",
					},
				],
			},
			states: [
				{
					name: "Andaman and Nicobar Islands",
				},
				{
					name: "Andhra Pradesh",
				},
				{
					name: "Arunachal Pradesh",
				},
				{
					name: "Assam",
				},
				{
					name: "Bihar",
				},
				{
					name: "Chandigarh",
				},
				{
					name: "Chhattisgarh",
				},
				{
					name: "Dadra and Nagar Haveli",
				},
				{
					name: "Daman and Diu",
				},
				{
					name: "Delhi",
				},
				{
					name: "Goa",
				},
				{
					name: "Gujarat",
				},
				{
					name: "Haryana",
				},
				{
					name: "Himachal Pradesh",
				},
				{
					name: "Jammu and Kashmir",
				},
				{
					name: "Jharkhand",
				},
				{
					name: "Karnataka",
				},
				{
					name: "Kerala",
				},
				{
					name: "Ladakh",
				},
				{
					name: "Lakshadweep",
				},
				{
					name: "Madhya Pradesh",
				},
				{
					name: "Maharashtra",
				},
				{
					name: "Manipur",
				},
				{
					name: "Meghalaya",
				},
				{
					name: "Mizoram",
				},
				{
					name: "Nagaland",
				},
				{
					name: "Odisha",
				},
				{
					name: "Puducherry",
				},
				{
					name: "Punjab",
				},
				{
					name: "Rajasthan",
				},
				{
					name: "Sikkim",
				},
				{
					name: "Tamil Nadu",
				},
				{
					name: "Telangana",
				},
				{
					name: "Tripura",
				},
				{
					name: "Uttar Pradesh",
				},
				{
					name: "Uttarakhand",
				},
				{
					name: "West Bengal",
				},
			],
		};
	},
	created: async function () {
		await this.fetchEvent();
	},
	methods: {
		fetchEvent: async function (e) {
			await axios({
				url: "http://localhost:8080/api/events/" + this.$route.params.slug,
				method: "GET",
			})
				.then((resp) => {
					this.event = resp.data;
				})
				.catch((err) => this.$toast.error(err.response.data.message.message, "Error"));
		},
		drawerOpen(package_data) {
			this.drawer = true;
			this.form.event_name = this.event.title;
			this.form.event = this.event._id;
			this.form.package_name = package_data.title;
			this.form.package = package_data._id;
		},
		handleClose() {
			this.resetForm("form");
			this.loading = false;
			this.drawer = false;
			clearTimeout(this.timer);
		},
		async submitForm(formName) {
			this.loading = true;
			await this.$refs[formName].validate(async (valid) => {
				if (valid) {
					await axios({
						url: "http://localhost:8080/api/bookings",
						data: this.form,
						method: "POST",
					})
						.then((resp) =>
							this.$toast.success("Submitted Successfully", "Success")
						)
						.catch((err) =>
							this.$toast.error(err.response.data.message.message, "Error")
						);
				} else {
					this.$toast.error("Please Check Input", "Error");
				}
			});
			this.loading = false;
			this.drawer = false;
			this.resetForm("form");
		},
		resetForm(formName) {
			this.$refs[formName].resetFields();
		},
	},
	computed: {
		isLoggedIn: function () {
			return this.$store.getters.isLoggedIn;
		},
	},
};
</script>
<style>
.el-carousel__item h3 {
	color: #475669;
	font-size: 14px;
	opacity: 0.75;
	line-height: 200px;
	margin: 0;
}

.el-carousel__item:nth-child(2n) {
	background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
	background-color: #d3dce6;
}

.pricing-table .card {
	width: 100%;
	padding: 30px 30px 70px 30px;
	border-radius: 1.5rem;
	display: -webkit-box;
	display: flex;
	-webkit-box-orient: vertical;
	-webkit-box-direction: normal;
	flex-direction: column;
	-webkit-box-align: center;
	align-items: center;
	position: relative;
	overflow: hidden;
	box-shadow: 2px 2px 18px -4px rgba(0, 0, 0, 0.6);
	-webkit-transition: all 0.2s ease-in-out;
	transition: all 0.2s ease-in-out;
}
.pricing-table .card {
	background: #7f7fd5;
	background: -webkit-gradient(
		linear,
		right top,
		left top,
		from(#91eae4),
		color-stop(#86a8e7),
		to(#7f7fd5)
	);
	background: linear-gradient(to left, #91eae4, #86a8e7, #7f7fd5);
}

.pricing-table .card .price::before {
	content: "$20";
}

.pricing-table .card .type {
	margin-top: 30px;
	letter-spacing: 0.1rem;
}
.pricing-table .card .price {
	font-size: 4rem;
	position: relative;
	margin: 10px 0px 20px;
	z-index: 2;
}
.pricing-table .card .price span {
	font-size: 1.8rem;
	position: absolute;
	left: -15%;
	top: 65%;
}
.pricing-table .card .price::before {
	position: absolute;
	content: attr(data-price);
	color: rgba(255, 255, 255, 0.06);
	font-size: 9.5rem;
	z-index: -1;
	right: -30%;
	bottom: 15%;
	text-shadow: 0 0 0px rgba(51, 55, 69, 0);
	-webkit-transition: all 1s ease-in-out;
	transition: all 1s ease-in-out;
}
.pricing-table .card .plan {
	font-size: 1.3rem;
	position: relative;
	margin-bottom: 10px;
}
.pricing-table .card .plan::before,
.pricing-table .card .plan::after {
	position: absolute;
	content: "";
	width: 35px;
	height: 2px;
	background: #fff;
	bottom: 40%;
	-webkit-transition: all 0.2s ease-out;
	transition: all 0.2s ease-out;
}
.pricing-table .card .plan::before {
	right: 100%;
	-webkit-transform: translate(-50%, -50%);
	transform: translate(-50%, -50%);
}
.pricing-table .card .plan::after {
	right: -100%;
	-webkit-transform: translate(0%, -50%);
	transform: translate(0%, -50%);
}
.pricing-table .card .details {
	text-transform: capitalize;
}
.pricing-table .card .details li {
	text-align: left;
	margin: 15px 0px;
}
.pricing-table .card .buy-button {
	cursor: pointer;
	position: absolute;
	width: 217px;
	height: 144px;
	background: #fff;
	border-radius: 15%;
	right: -7%;
	bottom: -70px;
	-webkit-transition: all 0.4s ease-in-out;
	transition: all 0.4s ease-in-out;
}

.pricing-table .card .buy-button h3 {
	text-shadow: 0 0 0;
	text-decoration: none;
	color: #fff;
	position: absolute;
	left: 8%;
	top: 10%;
	color: #333745;
	font-size: 1.2rem;
	-webkit-transition: all 0.4s ease-in-out;
	transition: all 0.4s ease-in-out;
}
.pricing-table .card .buy-button h3 {
	text-shadow: 0 0 0;
	text-decoration: none;
	color: #fff;
	position: absolute;
	left: 8%;
	top: 10%;
	color: #333745;
	font-size: 1.2rem;
	-webkit-transition: all 0.4s ease-in-out;
	transition: all 0.4s ease-in-out;
}

.pricing-table .card:hover {
	-webkit-transform: scale(1.02);
	transform: scale(1.02);
}
.pricing-table .card:hover .price::before {
	-webkit-animation: text-hover 1s ease-in-out infinite normal;
	animation: text-hover 1s ease-in-out infinite normal;
}
.pricing-table .card:hover .plan::before {
	right: 90%;
}
.pricing-table .card:hover .plan::after {
	right: -90%;
}
.pricing-table .card:hover .buy-button {
	width: 100%;
	right: 0%;
	border-radius: 0%;
}

.pricing-table .card .buy-button .plan-btn {
	text-shadow: 0 0 0;
	text-decoration: none;
	background-color: #ffffff00;
	position: absolute;
	padding: 18px 18px;
	color: #333745;
	font-size: 1.2rem;
	-webkit-transition: all 0.4s ease-in-out;
	transition: all 0.4s ease-in-out;
}

@-webkit-keyframes text-hover {
	0% {
		right: -30%;
	}
	50% {
		right: -37%;
	}
	100% {
		right: -30%;
	}
}

@keyframes text-hover {
	0% {
		right: -30%;
	}
	50% {
		right: -37%;
	}
	100% {
		right: -30%;
	}
}
</style>
