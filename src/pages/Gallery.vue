<template>
	<div>
		<div class="section">
			<div class="container">
				<div class="row">
					<div class="col-md-8 ml-auto mr-auto text-center">
						<h2 class="title">Gallery</h2>
					</div>
				</div>
				<div class="separator separator-primary"></div>
				<div class="section-gallery">
					<div class="row">
						<div class="col-md-12 ml-auto mr-auto">
							<div class="row collections">
								<div class="col-md-4" v-for="img in imgs" :key="img._id">
									<el-image
										style="width: 100%; height: auto"
										:src="img.image"
										:preview-src-list="[img.image]"
									>
									</el-image>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { Button } from "@/components";
import axios from "axios";

export default {
	name: "gallery",
	bodyClass: "gallery-page",
	components: {
		[Button.name]: Button,
	},
	data: function () {
		return { imgs: {} };
	},
	created: async function () {
		await this.fetchGallery();
	},
	methods: {
		fetchGallery: async function (e) {
			await axios({
				url: "http://localhost:8080/api/gallery",
				method: "GET",
			})
				.then((resp) => {
					this.imgs = resp.data;
				})
				.catch((err) => this.$toast.error(err.response.data.message.message, "Error"));
		},
	},
};
</script>
<style></style>
