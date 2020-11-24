<template>
	<div class="page-header clear-filter" filter-color="orange">
		<div
			class="page-header-image"
			style="background-image: url('img/home1.jpg')"
		></div>
		<div class="content">
			<div class="container">
				<div class="col-md-5 ml-auto mr-auto">
					<form @submit.prevent="login">
						<card type="login" plain>
							<h1>Login</h1>
							<!-- <div slot="header" class="logo-container">
								 <img v-lazy="'img/now-logo.png'" alt="" />
							   </div> -->

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
								addon-left-icon="now-ui-icons ui-1_lock-circle-open"
								placeholder="Password..."
								type="password"
								v-model="password"
								required
							>
							</fg-input>
							<div class="card-footer text-center">
								<button
									type="submit"
									class="btn btn-round btn-primary btn-lg btn-block"
								>
									Login
								</button>
							</div>
							<div class="pull-left">
								<h6>
									<router-link to="/register" class="link footer-link"
										>Create Account</router-link
									>
								</h6>
							</div>
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
	name: "login-page",
	bodyClass: "login-page",
	components: {
		Card,
		MainFooter,
		[Button.name]: Button,
		[FormGroupInput.name]: FormGroupInput,
	},
	data: function () {
		return {
			email: "",
			password: "",
		};
	},
	methods: {
		login: function () {
			let email = this.email;
			let password = this.password;
			this.$store
				.dispatch("login", { email, password })
				.then(() => this.$router.push("/"))
				.catch((err) => this.$toast.error(err.response.data.message, "Error"));
		},
	},
};
</script>

<style>
</style>
