<template>
	<header class="header">
		<div class="header-top">
			<div class="container">
				<div class="header-left d-none d-xl-block">
					<div class="info-box info-box-icon-left p-0">
						<i class="icon-shipping text-primary"></i>

						<div class="info-box-content0">
							<h4 class="mb-0">FREE Express Shipping On Orders $99+</h4>
						</div>
					</div>
				</div>

				<div class="header-right header-dropdowns">
					<!--<div class="header-dropdown font2">
						<a href="javascript:;">USD</a>
						<div class="header-menu">
							<ul>
								<li><a href="javascript:;">EUR</a></li>
								<li><a href="javascript:;">USD</a></li>
							</ul>
						</div>
					</div>

					<div class="header-dropdown mr-4 pl-2 font2">
						<a href="javascript:;">ENG</a>
						<div class="header-menu">
							<ul>
								<li><a href="javascript:;">ENG</a>
								</li>
								<li><a href="javascript:;">FRH</a></li>
							</ul>
						</div>
					</div>-->

					<div class="separator d-none d-lg-inline"></div>

					<div class="header-dropdown dropdown-expanded d-none d-lg-block">
						<a href="javascript:;">Links</a>
						<div class="header-menu">
							<ul>
								<!--<li>
									<a href="javascript:;">
										<i class="icon-pin"></i>
										Our Stores
									</a>
								</li>
								<li>
									<a href="javascript:;">
										<i class="icon-shipping-truck"></i>
										Track Your Order
									</a>
								</li>-->
								<li>
									<a href="javascript:;">
										<i class="icon-help-circle"></i>
										Help
									</a>
								</li>
								<li>
									<nuxt-link to="/pages/wishlist">
										<i class="icon-wishlist-2"></i>
										Wishlist
									</nuxt-link>
								</li>
							</ul>
						</div>
					</div>

					<span class="separator d-none d-lg-inline"></span>

					<div class="social-icons">
						<a
							href="javascript:;"
							class="social-icon social-instagram icon-instagram"
						></a>
						<!--<a
							href="javascript:;"
							class="social-icon social-twitter icon-twitter"
						></a>-->
						<a
							href="javascript:;"
							class="social-icon social-facebook icon-facebook"
						></a>
					</div>
				</div>
			</div>
		</div>

		<div class="header-middle sticky-header mobile-sticky">
			<div class="container">
				<div class="header-left w-lg-max">
					<button
						class="mobile-menu-toggler text-primary mr-2"
						type="button"
						@click="showMobileMenu"
					>
						<i class="fas fa-bars"></i>
					</button>
					<nuxt-link
						to="/"
						class="logo"
					>
						<!--<img
							src="~/static/images/logo-black.png"
							width="101"
							height="40"
							alt="Porto Logo"
							class="w-100"
						/>-->
                        <img class="logo-main"
							:src="settingData.logo"
							alt="Porto Logo"
							
						/>
					</nuxt-link>

					<pv-header-search></pv-header-search>
				</div>
{{settingData.storeName }}
				<div class="header-right">
					<nuxt-link
						to="/pages/wishlist"
						class="header-icon position-relative d-lg-none mr-2"
					>
						<i class="icon-wishlist-2"></i>
						<span class="badge-circle">{{ wishList.length }}</span>
					</nuxt-link>

					<div class="header-user d-lg-flex align-items-center">
						<nuxt-link
							to="/pages/login"
							class="header-icon mr-0"
							title="login"
						><i class="icon-user-2 mr-2"></i></nuxt-link>
						<h6 class="font1 d-none d-lg-block mb-0"><span class="d-block text-body">Welcome</span>
							<nuxt-link v-if="userData.name == ''"
								to="/pages/login"
								class="font-weight-bold"
							>Sign In / Register</nuxt-link>
							<nuxt-link v-else
								to="/pages/account"
								class="font-weight-bold"
							>{{ userData.name }}</nuxt-link>
						</h6>
					</div>

					<pv-cart-menu></pv-cart-menu>
				</div>
			</div>
		</div>

		<div
			class="header-bottom sticky-header d-none d-lg-flex desktop-sticky"
			:class="{'border-bottom': $route.path !== '/'}"
		>
			<div class="container">
				<div class="header-center w-100 ml-0">
					<pv-main-menu></pv-main-menu>

					<div class="info-boxes font2 align-items-center ml-auto">
						<div class="info-item">
							<a href="javascript:;"><i class="icon-percent-shape"></i>Special Offers</a>
						</div>
						<!--<div class="info-item">
							<a href="javascript:;"><i class="icon-business-book"></i>Recipes</a>
						</div>-->
					</div>
				</div>
			</div>
		</div>
	</header>
</template>

<script>
import { loginUser } from '/api';
import Api, { baseUrl } from '/api';
import { mapGetters } from 'vuex';
import PvMainMenu from '~/components/common/partials/PvMainMenu';
import PvCartMenu from '~/components/common/partials/PvCartMenu';
import PvHeaderSearch from '~/components/common/partials/PvHeaderSearch';

document.querySelector( 'body' ).classList.add( 'loaded' );

export default {
	components: {
		PvMainMenu,
		PvCartMenu,
		PvHeaderSearch
	},
	data() {
    return {
		userData: {
        	name: '',
     	},
		settingData: {
        	logo: '',
        	storeName: '',
			bgColor:'',
     	},

		
	}
	},
	computed: {
		...mapGetters( 'wishlist', [ 'wishList' ] )
	},
	cssVars() {
		alert(this.settingData.bgColor);
      return {
        '--bgColor': this.settingData.bgColor,
      }
    },
	mounted: function (){

		if(loginUser.name){
		this.userData.name = loginUser.name;
		}
		this.getSetting();
	},
	methods: {
		openLoginModal: function () {
			this.$modal.show(
				() => import( '~/components/features/modal/PvLoginModal' ),
				{},
				{ width: '525', height: 'auto', adaptive: true }
			);
		},
		showMobileMenu: function () {
			document.querySelector( 'body' ).classList.add( 'mmenu-active' );
		},
		showMobileSearch: function ( e ) {
			let headerSearch = e.currentTarget.closest( '.header-search' );
			headerSearch.classList.add( 'show' );
			headerSearch
				.querySelector( '.header-search-wrapper' )
				.classList.add( 'show' );
		},
		getSetting: function(){
			Api.get( `${ baseUrl }/setting`)
			.then(response => {
				this.settingData.storeName = response.data.storeName;
				//this.settingData.logo = response.data.logo;

				console.log(response.data)

				response.data.setting.forEach((value) => {
					
					if(value.setting_key == "storeName"){
						this.settingData.storeName = value.setting_value;
					}
					if(value.setting_key == "logo"){
						this.settingData.logo = value.setting_value;
					}
					if(value.setting_key == "bgColor"){
						this.settingData.bgColor = value.setting_value;
						
						//alert(this.settingData.bgColor);
					}
					
				

				});

			})
	
			
		},
	}
};
</script>
<style>
.logo-main {
  height: 70px !important;
  width: 212px !important;
  max-width: initial;
}
</style>
