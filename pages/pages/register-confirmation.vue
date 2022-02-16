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
							>Register Confirmation</li>
						</ol>
					</div>
				</nav>

				<h1>Register Confirmation</h1>
			</div>
		</div>

		<div class="container login-container">
			<div class="row">
				<div class="col-lg-10 mx-auto">
					<div class="row">
						<div class="col-md-6 mx-auto">
							<div class="heading mb-1">
								<h2 class="title">Register Details</h2>
							</div>
							<b-form v-if="true" ref="formClear" @submit.prevent="registerConfirmation">

                                <label for="register-name">
									Name
									<span class="required">*</span>
								</label>
								<input
									type="text"
									class="form-input form-wide"
									id="register-name"
									v-model="userName"
									required
								/>
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
                                <label for="register-mobile">
									Mobile
								</label>
								<input
									type="text"
									class="form-input form-wide"
									v-model="userMobile"
									readonly
								/>

								<div class="form-footer mb-2">
									<button
										type="submit"
										class="btn btn-dark btn-md w-100 mr-0"
									>Update</button>
								</div>
							</b-form>
						</div>
					</div>
				</div>
			</div>
		</div>
	</main>
</template>

<script>
import {
    BForm, BFormInput, BButton, 
} from 'bootstrap-vue'
import Api, { baseUrl } from '~/api';
export default {
components:{
	BForm,
	BButton,
	BFormInput,
},

  data() {
    return {
      status: '',
      password: '',
      userEmail: '',
      userName: '',
      userMobile:'',
      userId:'',
	  accessToken:'',

    }
  },
  mounted() {
    //this.getCurrentUsers()
	this.loCal()
  },
  methods: {
	loCal(){
	
		let data = JSON.parse(localStorage.getItem('userData'));
		let userAccessToken = JSON.parse(localStorage.getItem('userAccessToken'));
		
	
		this.userId = data.id
		this.userMobile = data.phone
		this.accessToken = userAccessToken.access_token
	
	},

    registerConfirmation() {

		var form = new FormData();
		form.append('name',this.userName);
		form.append('email',this.userEmail);
		form.append('password',this.password);
		form.append('id',this.userId);

		Api.post(`${ baseUrl }/currentregister`, form)
		.then(response => {
			if(response.data.status == '200'){
				this.$router.push('/pages/account')
			}
		})
		

    
    },
  },
}
</script>