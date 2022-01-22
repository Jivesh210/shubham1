<template>
	<main class="main">
		<div class="page-header">
			<div class="container d-flex flex-column align-items-center">
				<nav
					aria-label="breadcrumb"
					class="breadcrumb-nav border-bottom-0"
				>
					<div class="container">
						<ol class="breadcrumb">
							<li class="breadcrumb-item">
								<nuxt-link to="/">Home</nuxt-link>
							</li>
							<li class="breadcrumb-item">
								<nuxt-link to="/shop">Shop</nuxt-link>
							</li>
							<li
								class="breadcrumb-item active"
								aria-current="page"
							>My Account</li>
						</ol>
					</div>
				</nav>

				<h1>My Account</h1>
			</div>
		</div>

		<div class="container login-container">
			<div class="row">
				<div class="col-lg-10 mx-auto">
					<div class="row">
						<div class="col-md-6 mx-auto">
							<div class="heading mb-1">
								<h2 class="title">Register</h2>
							</div>

							<form action="#">
								<label for="register-email">
									Email address
									<span class="required">*</span>
								</label>
								<input
									type="email"
									class="form-input form-wide"
									id="register-email"
									v-model="userEmail"
									required
								/>

								<label for="register-password">
									Password
									<span class="required">*</span>
								</label>
								<input
									type="password"
									class="form-input form-wide"
									id="register-password"
									v-model="password"
									required
								/>

								<div class="form-footer mb-2">
									<button
										type="submit"
										class="btn btn-dark btn-md w-100 mr-0"
									>Register</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	</main>
</template>

<script>

export default {

  data() {
    return {
      status: '',
      password: '',
      userEmail: '',

    }
  },
  methods: {
    login() {
      this.$refs.loginForm.validate().then(success => {
        if (success) {
          axios.post(`${this.apiUrl}login`, {
               email: this.userEmail,
              password: this.password,
            })
            .then(response => {
                console.log(response)
                  useJwt.setToken(response.data.access_token)
                  localStorage.setItem('userData', JSON.stringify(response.data.user_data))
                  this.$ability.update(response.data.user_data.ability)
                  // ? This is just for demo purpose as well.
                  // ? Because we are showing eCommerce app's cart items count in navbar
                  // this.$store.commit('app-ecommerce/UPDATE_CART_ITEMS_COUNT', userData.extras.eCommerceCartItemsCount)

                  // ? This is just for demo purpose. Don't think CASL is role based in this case, we used role in if condition just for ease
                  this.$router.push('/')
                  // this.$router.replace(getHomeRouteForLoggedInUser(response.data.user_data.role))
                    .then(() => {
                      
                    })
            })
            .catch(error => {
              this.$refs.loginForm.setErrors(error.response.data.message)
            })
        }
      })
    },
  },
}
</script>