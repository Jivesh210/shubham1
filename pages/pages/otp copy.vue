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
								<h2 class="title">Register with OTP</h2>
							</div>

							<form action="#" v-if="enterOtp == 0">
								<label for="register-email">
									Enter Mobile No.
									<span class="required">*</span>
								</label>
								<input
									type="text"
									class="form-input form-wide"
									id="phone"
									v-model="phoneNumber"
									required
								/>
								<div class="form-footer mb-2">
									<button
										type="button"
										class="btn btn-dark btn-md w-100 mr-0"
                                        @click="sendOtp"
									>Send OTP</button>
								</div>
							</form>
							<div id="recaptcha-container"></div>
							<form action="#" v-if="enterOtp == 1">
								<label for="register-email">
									Enter OTP
									<span class="required">*</span>
								</label>
								<input
									type="text"
									class="form-input form-wide"
									id="phone"
									v-model="otp"
									required
								/>

								<div class="form-footer mb-2">
									<button
										type="button"
										class="btn btn-dark btn-md w-100 mr-0"
                                        @click="verifyOtp"
									>Verify</button>
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
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import Api, { baseUrl } from '~/api';

export default {

  data() {
    return {
      phoneNumber: '',
      appverify: '',
      auth: '',
	  enterOtp: 0,
	  otp: '',
	  confirmationResult: '',
    }
  },
  mounted(){

      this.auth = getAuth();
        this.appverify = new RecaptchaVerifier('recaptcha-container', {
        'size': 'invisible',
        'callback': (response) => {
            // reCAPTCHA solved, allow signInWithPhoneNumber.
            onSignInSubmit();
        }
        }, this.auth);

  },
  methods: {
      sendOtp(){
          var phonewithcountry = '+91'+this.phoneNumber
          signInWithPhoneNumber(this.auth, phonewithcountry, this.appverify)
            .then((confirmationResult) => {
            // SMS sent. Prompt user to type the code from the message, then sign the
            // user in with confirmationResult.confirm(code).
            this.confirmationResult = confirmationResult;
			if(confirmationResult)
			{
				this.enterOtp = 1
			}
            console.log(confirmationResult);
            // ...
            }).catch((error) => {
            // Error; SMS not sent
            // ...
            });
      },
	  verifyOtp(){
			const code = this.otp;
			this.confirmationResult.confirm(code).then((result) => {
			// User signed in successfully.
			const user = result.user;
			
			Api.post( `${ baseUrl }/register-otp`, {
				type: 'phone',
				uid: user.uid,
				phone: user.phoneNumber
            }).then(res => {
				console.log(res.data)
				localStorage.setItem('userData', JSON.stringify(res.data.user))
                this.$ability.update(res.data.user.ability)
				this.$router.push('/')
			})

			console.log(user);
			}).catch((error) => {
			// User couldn't sign in (bad verification code?)
			// ...
			});

	  }

  },
}
</script>
