<template>
	<navbar
		position="fixed"
		type="primary"
		:transparent="transparent"
		:color-on-scroll="colorOnScroll"
		menu-classes="ml-auto"
	>
		<template>
			<router-link class="navbar-brand" to="/">
				Evento
			</router-link>
		</template>
		<template slot="navbar-menu">
			<li class="nav-item">
				<router-link class="nav-link" to="/">
					Home
				</router-link>
			</li>
			<li class="nav-item">
				<router-link class="nav-link" to="/events">
					Events
				</router-link>
			</li>
			<li class="nav-item">
				<router-link class="nav-link" to="/gallery">
					Gallery
				</router-link>
			</li>
			<drop-down
				tag="li"
				:title="username"
				icon="now-ui-icons users_circle-08"
				class="nav-item"
				v-if="isLoggedIn"
			>
				<nav-link to="/profile"> Profile </nav-link>
				<a class="dropdown-item" href="#" @click="logout"> Logout </a>
			</drop-down>
			<drop-down
				tag="li"
				title="Account"
				icon="now-ui-icons users_circle-08"
				class="nav-item"
				v-else
			>
				<nav-link to="/login">
					<i class="now-ui-icons users_single-02"></i> Login
				</nav-link>
				<nav-link to="/register"> Register </nav-link>
			</drop-down>
			<li class="nav-item">
				<a
					class="nav-link"
					rel="tooltip"
					title="Follow us on Twitter"
					data-placement="bottom"
					href="https://twitter.com/CreativeTim"
					target="_blank"
				>
					<i class="fab fa-twitter"></i>
					<p class="d-lg-none d-xl-none">Twitter</p>
				</a>
			</li>
			<li class="nav-item">
				<a
					class="nav-link"
					rel="tooltip"
					title="Like us on Facebook"
					data-placement="bottom"
					href="https://www.facebook.com/CreativeTim"
					target="_blank"
				>
					<i class="fab fa-facebook-square"></i>
					<p class="d-lg-none d-xl-none">Facebook</p>
				</a>
			</li>
			<li class="nav-item">
				<a
					class="nav-link"
					rel="tooltip"
					title="Follow us on Instagram"
					data-placement="bottom"
					href="https://www.instagram.com/CreativeTimOfficial"
					target="_blank"
				>
					<i class="fab fa-instagram"></i>
					<p class="d-lg-none d-xl-none">Instagram</p>
				</a>
			</li>
		</template>
	</navbar>
</template>

<script>
import { DropDown, Navbar, NavLink } from "@/components";
export default {
	name: "main-navbar",
	props: {
		transparent: Boolean,
		colorOnScroll: Number,
	},
	components: {
		DropDown,
		Navbar,
		NavLink,
	},
	computed: {
		isLoggedIn: function () {
			return this.$store.getters.isLoggedIn;
		},
		username: function () {
			return this.$store.getters.username;
		},
	},
	methods: {
		logout: function () {
			this.$store.dispatch("logout").then(() => {
				this.$router.push("/login");
			});
		},
	},
};
</script>

<style scoped></style>
