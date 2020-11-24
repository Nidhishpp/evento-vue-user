<template>
	<div>
		<div class="page-header clear-filter" filter-color="orange">
			<parallax
				class="page-header-image"
				style="background-image: url('img/home2.jpg')"
			>
			</parallax>
			<div class="container">
				<div class="photo-container">
					<img :src="user.avatar" alt="" />
				</div>
				<h3 class="title">{{ user.first_name }} {{ user.last_name }}</h3>
				<p class="category text-lowercase">{{ user.email }}</p>
				<p class="category text-lowercase">{{ user.phone }}</p>
				<div class="content">
					<div class="social-description">
						<h2>
							{{
								Object.keys(this.filterItemsStatus(bookings, "confirmed"))
									.length
							}}
						</h2>
						<p>Confirmed</p>
					</div>
					<div class="social-description">
						<h2>
							{{
								Object.keys(this.filterItemsStatus(bookings, "pending")).length
							}}
						</h2>
						<p>Requested</p>
					</div>
					<div class="social-description">
						<h2>
							{{
								Object.keys(this.filterItemsStatus(bookings, "completed"))
									.length
							}}
						</h2>
						<p>Completed</p>
					</div>
				</div>
			</div>
		</div>
		<div class="section">
			<div class="container">
				<div class="button-container">
					<router-link
						class="btn btn-primary btn-round btn-lg"
						to="/edit-profile"
					>
						Edit Profile
					</router-link>
				</div>
				<div class="row">
					<div class="col-md-8 ml-auto mr-auto">
						<h4 class="title text-center">My Bookings</h4>
					</div>
					<div class="col-md-12 ml-auto mr-auto">
						<tabs
							type="primary"
							tabContentClasses="tab-subcategories"
							square
							centered
							class="nav-align-center"
						>
							<tab-pane>
								<span slot="label">
									<i class="now-ui-icons objects_umbrella-13"></i>Confirmed
								</span>
								<el-table
									:data="this.filterItemsStatus(bookings, 'confirm')"
									style="width: 100%"
								>
									<el-table-column type="expand">
										<template slot-scope="props">
											<p>
												Address: {{ props.row.address_line_1 }}
												{{ props.row.address_line_2 }}
											</p>
											<p>State: {{ props.row.state }}</p>
											<p>City: {{ props.row.city }}</p>
											<p>Pimcode: {{ props.row.pincode }}</p>
											<p>Message: {{ props.row.message }}</p>
										</template>
									</el-table-column>
									<el-table-column label="Event Name" prop="event_name">
									</el-table-column>
									<el-table-column label="Package" prop="package_name">
									</el-table-column>
									<el-table-column
										label="Start Date"
										prop="start_date"
										:formatter="formatDate"
									>
									</el-table-column>
									<el-table-column
										label="End Date"
										prop="end_date"
										:formatter="formatDate"
									>
									</el-table-column>
									<el-table-column label="Approx. Count" prop="approx_count">
									</el-table-column>
									<el-table-column label="Hall" prop="hall">
										<template slot-scope="scope">
											<el-tag
												effect="plain"
												:type="scope.row.hall ? 'success' : 'danger'"
												disable-transitions
												>{{ scope.row.hall ? "Yes" : "No" }}</el-tag
											>
										</template></el-table-column
									>
								</el-table>
							</tab-pane>
							<tab-pane>
								<span slot="label">
									<i class="now-ui-icons shopping_shop"></i>Requested
								</span>
								<el-table
									:data="this.filterItemsStatus(bookings, 'pending')"
									style="width: 100%"
								>
									<el-table-column type="expand">
										<template slot-scope="props">
											<p>
												Address: {{ props.row.address_line_1 }}
												{{ props.row.address_line_2 }}
											</p>
											<p>State: {{ props.row.state }}</p>
											<p>City: {{ props.row.city }}</p>
											<p>Pimcode: {{ props.row.pincode }}</p>
											<p>Message: {{ props.row.message }}</p>
										</template>
									</el-table-column>
									<el-table-column label="Event Name" prop="event_name">
									</el-table-column>
									<el-table-column label="Package" prop="package_name">
									</el-table-column>
									<el-table-column
										label="Start Date"
										prop="start_date"
										:formatter="formatDate"
									>
									</el-table-column>
									<el-table-column
										label="End Date"
										prop="end_date"
										:formatter="formatDate"
									>
									</el-table-column>
									<el-table-column label="Approx. Count" prop="approx_count">
									</el-table-column>
									<el-table-column label="Hall" prop="hall">
										<template slot-scope="scope">
											<el-tag
												effect="plain"
												:type="scope.row.hall ? 'success' : 'danger'"
												disable-transitions
												>{{ scope.row.hall ? "Yes" : "No" }}</el-tag
											>
										</template></el-table-column
									>
									<el-table-column label="Operations">
										<template slot-scope="scope">
											<el-button
												size="mini"
												type="danger"
												@click="handleCancel(scope.$index, scope.row)"
												>Cancel</el-button
											>
										</template>
									</el-table-column>
								</el-table>
							</tab-pane>
							<tab-pane>
								<span slot="label">
									<i class="now-ui-icons ui-2_settings-90"></i>Completed
								</span>
								<el-table
									:data="this.filterItemsStatus(bookings, 'completed')"
									style="width: 100%"
								>
									<el-table-column type="expand">
										<template slot-scope="props">
											<p>
												Address: {{ props.row.address_line_1 }}
												{{ props.row.address_line_2 }}
											</p>
											<p>State: {{ props.row.state }}</p>
											<p>City: {{ props.row.city }}</p>
											<p>Pimcode: {{ props.row.pincode }}</p>
											<p>Message: {{ props.row.message }}</p>
										</template>
									</el-table-column>
									<el-table-column label="Event Name" prop="event_name">
									</el-table-column>
									<el-table-column label="Package" prop="package_name">
									</el-table-column>
									<el-table-column
										label="Start Date"
										prop="start_date"
										:formatter="formatDate"
									>
									</el-table-column>
									<el-table-column
										label="End Date"
										prop="end_date"
										:formatter="formatDate"
									>
									</el-table-column>
									<el-table-column label="Approx. Count" prop="approx_count">
									</el-table-column>
									<el-table-column label="Hall" prop="hall">
										<template slot-scope="scope">
											<el-tag
												effect="plain"
												:type="scope.row.hall ? 'success' : 'danger'"
												disable-transitions
												>{{ scope.row.hall ? "Yes" : "No" }}</el-tag
											>
										</template></el-table-column
									>
								</el-table>
							</tab-pane>
							<tab-pane>
								<span slot="label">
									<i class="now-ui-icons ui-2_settings-90"></i>Canceled
								</span>
								<el-table
									:data="this.filterItemsStatus(bookings, 'canceled')"
									style="width: 100%"
								>
									<el-table-column type="expand">
										<template slot-scope="props">
											<p>
												Address: {{ props.row.address_line_1 }}
												{{ props.row.address_line_2 }}
											</p>
											<p>State: {{ props.row.state }}</p>
											<p>City: {{ props.row.city }}</p>
											<p>Pimcode: {{ props.row.pincode }}</p>
											<p>Message: {{ props.row.message }}</p>
										</template>
									</el-table-column>
									<el-table-column label="Event Name" prop="event_name">
									</el-table-column>
									<el-table-column label="Package" prop="package_name">
									</el-table-column>
									<el-table-column
										label="Start Date"
										prop="start_date"
										:formatter="formatDate"
									>
									</el-table-column>
									<el-table-column
										label="End Date"
										prop="end_date"
										:formatter="formatDate"
									>
									</el-table-column>
									<el-table-column label="Approx. Count" prop="approx_count">
									</el-table-column>
									<el-table-column label="Hall" prop="hall">
										<template slot-scope="scope">
											<el-tag
												effect="plain"
												:type="scope.row.hall ? 'success' : 'danger'"
												disable-transitions
												>{{ scope.row.hall ? "Yes" : "No" }}</el-tag
											>
										</template></el-table-column
									>
								</el-table>
							</tab-pane>
						</tabs>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { Tabs, TabPane } from "@/components";
import axios from "axios";

export default {
	name: "profile",
	bodyClass: "profile-page",
	components: {
		Tabs,
		TabPane,
	},
	data: function () {
		return {
			user: {},
			bookings: {},
		};
	},
	created: async function () {
		await this.fetchUser();
		await this.fetchBookings();
	},
	methods: {
		fetchUser: async function (e) {
			await axios({
				url: "http://localhost:8080/api/profile",
				method: "GET",
			})
				.then((resp) => {
					this.user = resp.data;
				})
				.catch((err) =>
					this.$toast.error(err.response.data.message.message, "Error")
				);
		},
		fetchBookings: async function (e) {
			await axios({
				url: "http://localhost:8080/api/bookings/user",
				method: "GET",
			})
				.then((resp) => {
					this.bookings = resp.data;
				})
				.catch((err) =>
					this.$toast.error(err.response.data.message.message, "Error")
				);
		},
		filterItemsStatus: function (items, value) {
			if (Object.keys(items).length != 0) {
				return items.filter(function (item) {
					return item.status == value;
				});
			}
			return [];
		},
		formatDate(row, column, value) {
			var timeStr = value,
				intermediate = timeStr.split("T"),
				newStr =
					intermediate[0].split("-").join("/") +
					" " +
					intermediate[1].split(".")[0] +
					" GMT",
				newDate = new Date(newStr),
				newFormat =
					1 +
					newDate.getUTCMonth() +
					"/" +
					newDate.getUTCDate() +
					"/" +
					newDate.getFullYear();
			return newFormat;
		},
		async handleCancel(index, row) {
			await this.$confirm("Do you want to cancel?")
				.then(async (_) => {
					await axios({
						url: "http://localhost:8080/api/bookings/status/" + row._id,
						data: { status: "canceled" },
						method: "PATCH",
					})
						.then((resp) =>
							this.$toast.success("Canceled Successfully", "Success")
						)
						.catch((err) =>
							this.$toast.error(err.response.data.message.message, "Error")
						);
					await this.fetchBookings();
				})
				.catch((_) =>
					this.$toast.error("Error Cancel! Please contact Admin", "Error")
				);
		},
	},
};
</script>
<style>
</style>
