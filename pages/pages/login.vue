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
								<h2 class="title">Login</h2>
							</div>

							<form action="#" @submit.prevent="login">
								<label for="login-email">
									Username or email address
									<span class="required">*</span>
								</label>
								<input
									type="email"
									class="form-input form-wide"
									id="login-email"
									v-model="userEmail"
									required
								/>

								<label for="login-password">
									Password
									<span class="required">*</span>
								</label>
								<input
									type="password"
									class="form-input form-wide"
									id="login-password"
									v-model="password"
									required
								/>

								<div class="form-footer">
									<div class="custom-control custom-checkbox mb-0">
										<input
											type="checkbox"
											class="custom-control-input"
											id="lost-password"
										/>
										<label
											class="custom-control-label mb-0"
											for="lost-password"
										>
											Remember
											me
										</label>
									</div>

									<nuxt-link
										to="/pages/forgot-password"
										class="forget-password text-dark form-footer-right"
									>
										Forgot
										Password?
									</nuxt-link>
								</div>
								<button
									type="submit"
									class="btn btn-dark btn-md w-100"
								>LOGIN</button>
								<div class="form-footer">
									<nuxt-link
										to="/pages/otp"
										class="forget-password text-dark form-footer-right"
									>
									<button
									type="button"
									class="btn btn-dark btn-md w-100"
									>
										Register with OTP
									</button>
									</nuxt-link>
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
import Api, { baseUrl } from '/api';
import Vue from 'vue';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
Vue.use(VueSweetalert2);
export default {

  data() {
    return {
      status: '',
      password: '',
      userEmail: '',
	  access_token:'',

    }
  },
  mounted: function () {
  		let userAccessToken = JSON.parse(localStorage.getItem('userAccessToken'));
		this.access_token = (userAccessToken) ? userAccessToken : '';

		if(this.access_token != ''){
			this.$router.push('/pages/account')
			
		}
  },
  methods: {
    login() {
    //   this.$refs.loginForm.validate().then(success => {
    //     if (success) {
			Api.post( `${ baseUrl }/login`, {
              email: this.userEmail,
              password: this.password,
            })
            .then(response => {
                console.log(response.data)
                //   useJwt.setToken(response.data.access_token)
                  localStorage.setItem('userData', JSON.stringify(response.data.user_data))
				  localStorage.setItem('userAccessToken', JSON.stringify(response.data.access_token))
				  this.$router.push('/pages/account')
                //   this.$ability.update(response.data.user_data.ability)
                  // ? This is just for demo purpose as well.
                  // ? Because we are showing eCommerce app's cart items count in navbar
                  // this.$store.commit('app-ecommerce/UPDATE_CART_ITEMS_COUNT', userData.extras.eCommerceCartItemsCount)

                  // ? This is just for demo purpose. Don't think CASL is role based in this case, we used role in if condition just for ease
                //   this.$router.push('/')
                  // this.$router.replace(getHomeRouteForLoggedInUser(response.data.user_data.role))
                 //   .then(() => {

                 //   })
            })
            .catch(error => {
				console.log(error)
				this.autoClose('Email or Password is Invalid');
               //this.$refs.loginForm.setErrors(error.response.data.message)
		
            })
        // }
    //   })
    },
	autoClose(name) {
      this.$swal({
        title: '',
        icon: 'info',
        html: name,
        timer: 5000,
        customClass: {
          confirmButton: 'btn btn-success',
        },
        buttonsStyling: false,
      })
    },
  },
}
</script>
