var rootPath = "https://app.lenderprice.com/";
var webApi = "https://app.lenderprice.com/";

loadCSS = function(href) {
	var cssLink = $("<link rel='stylesheet' type='text/css' href='"+href+"'>");
	$("head").append(cssLink);
};

// loadCSS(rootPath+"/ang-app/js/angular-material/angular-material.min.css");
// loadCSS("https://fonts.googleapis.com/icon?family=Material+Icons");

loadCSS("https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.9/semantic.min.css");

function scrollToNewSearch() {
	var newSearchDiv = $('#newSearch');
	var container = $('#lpModalResult');
	var diff = container.scrollTop() + newSearchDiv.position().top;
	container.scrollTop(diff);
	console.log(diff);
}

$.getScript(rootPath+"/public/generatedJs/miniPricer/" + new Date().getTime(), function( data, textStatus, jqxhr ) {
	$.getScript('https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.9/semantic.min.js', function() {

		var elementId =  'mini-price-id';

		$("#" + elementId).attr("ng-controller", "MainController");

		PKG.root = "https://app.lenderprice.com"+PKG.root;
		var rootPath = "https://app.lenderprice.com/";
		loadCSS(rootPath + "ang-app/js/mdAccordion/material-accordion.css")


		var ref = '58e143b34cedfd00017671dd';
		var template = 'miniWidget';
		var rootPath = "https://app.lenderprice.com/";
		var webApi = "https://app.lenderprice.com/";
		var app = angular.module("mini-pricer", [
			'ngMaterial',
			'ngMessages', 'internationalPhoneNumber',
			'ngAnimate', 'mdAccordion'
		]);


		app.directive('dynamic', function($compile) {
			return {
				restrict : 'A',
				replace : true,
				link : function(scope, ele, attrs) {
					scope.$watch(attrs.dynamic, function(html) {
						ele.html(html);
						$compile(ele.contents())(scope);
					});
				}
			};
		});

		app.config(function($sceProvider) {
			// Completely disable SCE.  For demonstration purposes only!
			// Do not use in new projects.
			$sceProvider.enabled(false);
		});
		app.config(function($mdThemingProvider) {
			$mdThemingProvider.theme('default');
		});
		app.directive(PKG.directives.lang.Format.key, PKG.directives.lang.Format.func)
		Package('enum.com.cre8techlabs.entity.rate').VaraiableLoanType = [{"code":"_1_1","name":"_1_1","description":"1/1"},{"code":"_2_1","name":"_2_1","description":"2/1"},{"code":"_3_1","name":"_3_1","description":"3/1"},{"code":"_5_1","name":"_5_1","description":"5/1"},{"code":"_5_2","name":"_5_2","description":"5/2"},{"code":"_5_5","name":"_5_5","description":"5/5"},{"code":"_7_1","name":"_7_1","description":"7/1"},{"code":"_7_2","name":"_7_2","description":"7/2"},{"code":"_10_1","name":"_10_1","description":"10/1"}];
		app.controller('MainController', function ($scope, $http, $compile, $mdDialog, $timeout) {
			$scope.dayLocksList = [15,30,45];
			$scope.today = new Date();
			$scope.rootPath = "https://app.lenderprice.com/";
			$scope.webApi = "https://app.lenderprice.com/";
			$scope.varaiableLoanTypes = PKG['enum'].com.cre8techlabs.entity.rate.VaraiableLoanType;
			$scope.results = [];
			$scope.searching = false;
			$scope.vars = {
				showDetails: {},
				showMoreDetails: {},
				city: "",
				county: "",
				state: "",
				tableResult: {},
				tableResultTab: {},
				showMorePricing: false
			}
			$scope.tableResultClick = function(id) {
				$scope.vars.tableResult[id] = $scope.vars.tableResult[id]? false: true;
				$timeout(function() {

					$('#' + id + " .menu .item").tab();
				})
			}
			$scope.selectedIndex = 0;
			$scope.$watch('selectedIndex', function(newValue, oldValue) {
				if ($scope.shareRate) {
					if (newValue == 0) {
						$scope.shareRate.miniPricerPref.search.loanPurpose = 'Purchase';
					} else {
						$scope.shareRate.miniPricerPref.search.loanPurpose = 'Refinance';

					}
					$scope.searchFunction();

				}
			});
			$scope.loanPurposeTypes = [
				{key: 'Purchase', label: "Purchase"},
				{key: 'Refinance', label: "Refinance (R&T)"},
				{key: 'CashoutRefinance', label: "Cashout refinance"},

			];

			$scope.years = [
				{key: 30, label: "30 Years"},
				{key: 15, label: "15 Years"},
			];

			$scope.mortgageTypes = [
				{key: 'Conventional', label: "Conventional"},
				{key: 'FHA', label: "FHA"},
				{key: 'VA', label: "VA"},
			];
			$scope.loanTypes = [
				{key: 'Fixed', label: "Fixed"},
				{key: 'Variable', label: "Variable"},
			];
			$scope.propertyUseTypes = [
				{key: 'PrimaryResidence', label: "Primary Residence"},
				{key: 'SecondaryVacation', label: "Secondary Residence"},
				{key: 'Investment', label: "Investment (NOO)"}
			];
			$scope.propertyTypes = [
				{key: 'SingleFamily', label: "Single Family"},
				{key: 'MultiFamily', label: "Multi Family"},
				{key: 'Townhouse', label: "Townhouse"},
				{key: 'Condos', label: "Condominium"},
				{key: 'HighRiseCondo', label: "High Rise Condo"},
				{key: 'PlannedUnitDevelopment', label: "Planned Unit Dev."},
				{key: 'SiteCondo', label: "Site Condo"},
				{key: 'Modular', label: "Modular"},
				{key: 'UnitDwelling_2_4', label: "2-4 Unit Dwelling"}

			];
			$scope.ficoRange = [
				{key: 760, label: '760+'},
				{key: 740, label: '740 - 759'},
				{key: 720, label: '720 - 739'},
				{key: 700, label: '700 - 719'},
				{key: 680, label: '680 - 699'},
				{key: 660, label: '660 - 679'},
				{key: 640, label: '640 - 659'},
				{key: 620, label: '620 - 639'},
				{key: 600, label: '600 - 619'},
				{key: 580, label: '580 - 599'},
				{key: 560, label: '560 - 579'}

			];

			$scope.varaiableLoanTypes = [
				{key: "_1_1", label: "1/1"},
				{key: "_2_1", label: "2/1"},
				{key: "_3_1", label: "3/1"},
				{key: "_5_1", label: "5/1"},
				{key: "_5_2", label: "5/2"},
				{key: "_5_5", label: "5/5"},
				{key: "_7_1", label: "7/1"},
				{key: "_7_2", label: "7/2"},
				{key: "_10_1", label: "10/1"}
			];


			$scope.states = [
				{"name" : "Alabama", "code" : "AL"},
				{"name" : "Alaska", "code" : "AK"},
				{"name" : "Arizona", "code" : "AZ"},
				{"name" : "Arkansas", "code" : "AR"},
				{"name" : "California", "code" : "CA"},
				{"name" : "Colorado", "code" : "CO"},
				{"name" : "Connecticut", "code" : "CT"},
				{"name" : "Delaware", "code" : "DE"},
				{"name" : "District Of Columbia", "code" : "DC"},
				{"name" : "Florida", "code" : "FL"},
				{"name" : "Georgia", "code" : "GA"},
				{"name" : "Hawaii", "code" : "HI"},
				{"name" : "Idaho", "code" : "ID"},
				{"name" : "Illinois", "code" : "IL"},
				{"name" : "Indiana", "code" : "IN"},
				{"name" : "Iowa", "code" : "IA"},
				{"name" : "Kansas", "code" : "KS"},
				{"name" : "Kentucky", "code" : "KY"},
				{"name" : "Louisiana", "code" : "LA"},
				{"name" : "Maine", "code" : "ME"},
				{"name" : "Maryland", "code" : "MD"},
				{"name" : "Massachusetts", "code" : "MA"},
				{"name" : "Michigan", "code" : "MI"},
				{"name" : "Minnesota", "code" : "MN"},
				{"name" : "Mississippi", "code" : "MS"},
				{"name" : "Missouri", "code" : "MO"},
				{"name" : "Montana", "code" : "MT"},
				{"name" : "Nebraska", "code" : "NE"},
				{"name" : "Nevada", "code" : "NV"},
				{"name" : "New Hampshire", "code" : "NH"},
				{"name" : "New Jersey", "code" : "NJ"},
				{"name" : "New Mexico", "code" : "NM"},
				{"name" : "New York", "code" : "NY"},
				{"name" : "North Carolina", "code" : "NC"},
				{"name" : "North Dakota", "code" : "ND"},
				{"name" : "Ohio", "code" : "OH"},
				{"name" : "Oklahoma", "code" : "OK"},
				{"name" : "Oregon", "code" : "OR"},
				{"name" : "Pennsylvania", "code" : "PA"},
				{"name" : "Rhode Island", "code" : "RI"},
				{"name" : "South Carolina", "code" : "SC"},
				{"name" : "South Dakota", "code" : "SD"},
				{"name" : "Tennessee", "code" : "TN"},
				{"name" : "Texas", "code" : "TX"},
				{"name" : "Utah", "code" : "UT"},
				{"name" : "Vermont", "code" : "VT"},
				{"name" : "Virginia", "code" : "VA"},
				{"name" : "Washington", "code" : "WA"},
				{"name" : "West Virginia", "code" : "WV"},
				{"name" : "Wisconsin", "code" : "WI"},
				{"name" : "Wyoming", "code" : "WY"}
			];

			$scope.displayResultBaseEmpty = function (s, r) {
				if (r !== undefined && r != null) {

					if (s.showWhenEmpty && (r == null || r.length == 0))
					return true;

					return r.length > 0;
				}
				return false;
			}
			$scope.displayResultBaseVA = function (s, r) {
				if ($scope.shareRate) {

					if (r !== undefined) {
						if (!s.showOnlyIfVASelected) {
							return true;
						}
						if (s.showOnlyIfVASelected && $scope.shareRate.miniPricerPref.search.showVA)
						return true;
					}
				}
				return false;
			}
			$scope.displayResultBase2ndLoan = function (s, r) {
				if (r !== undefined && $scope.shareRate) {
					if (!s.showOnlyIfSecondLoan) {
						return true;
					}
					if (s.showOnlyIfSecondLoan && ($scope.shareRate.miniPricerPref.search.secondLoanOption) && $scope.shareRate.miniPricerPref.search.secondLoanAmount > 0)
					return true;
				}
				return false;
			}
			$scope.displayResultBaseLTV = function(loanCriteria) {
				if (!$scope.shareRate)
				return false;
				var ltv = $scope.shareRate.miniPricerPref.search.amount / $scope.shareRate.miniPricerPref.search.homeValue;
				ltv = ltv * 100;
				if (loanCriteria.ltvRange.from == null && loanCriteria.ltvRange.to == null)
				return true;
				var ok = true;
				if (loanCriteria.ltvRange.from != null && loanCriteria.ltvRange.from > ltv) {
					ok = ok && false;
				}
				if (loanCriteria.ltvRange.to != null && loanCriteria.ltvRange.to < ltv) {
					ok = ok && false;
				}
				return ok;
			}

			$scope.computeDownPayemnt = function(percent) {
				return percent * $scope.shareRate.miniPricerPref.homeValue;
			}
			$scope.computeDownPayemntPercent = function(loanAmount) {
				return loanAmount/$scope.shareRate.miniPricerPref.homeValue;
			}
			$scope.downPayments = [];
			for (var i = 5; i < 100; i += 5) {
				$scope.downPayments.push({value: i, label: (i + " %")});
			}

			$scope.changeFico = function(fico) {
			}
			$scope.changePropertyUse = function(propertyUse) {
			}
			$scope.changeLoanAmount = function(search, price, downPayment) {
				console.log(arguments)
				search.amount = price - downPayment;
			}
			$scope.setLoanAmounts = function() {
			}
			$scope.initDefaultPricing = function() {
				$scope.setLoanAmounts();
			}
			$scope.$watch(function() {
				if (!$scope.shareRate)
				return "";
				return angular.toJson($scope.shareRate.miniPricerPref)}, function() {$scope.results = [];});


				$scope.postShareRate = function () {

					$http.post($scope.webApi + "public/rest/share/rate/search?noSpin", angular.toJson($scope.shareRate)).success(function(results) {
						$scope.results = results;
						var dayLocksList = {};
						for (var k in results) {
							var rList = results[k];
							for (var j in rList) {
								var r = rList[j];
								for (var i in r.dayLocksList) {
									dayLocksList[r.dayLocksList[i]] = r.dayLocksList[i];
								}
							}
						}
						$scope.dayLocksList = [];
						for (var k in dayLocksList) {
							$scope.dayLocksList.push(dayLocksList[k]);
						}
						$scope.dayLocksList.sort(function(a,b) {return a-b;});
						$scope.searching = false;

					}).error(function (data, status, headers, config) {
						PKG.common.ui.JNotify.ShowError(data.message);
						$scope.searching = false;
					});
				}

				function sendEmailNotification(ipAddress) {
					var originalSearch = $scope.shareRate.miniPricerPref.search;
					// console.log($scope.shareRate.miniPricerPref.originalSearch);
					// Send an email to Zapier, to send to everyone
					emailData = {};
					emailData.fullName = originalSearch.fullName;
					emailData.emailAddress = originalSearch.emailAddress;
					emailData.phoneNumber = originalSearch.phoneNumber;
					emailData.ipAddress = ipAddress;
					emailData.loanPurpose = originalSearch.loanPurpose;
					emailData.propertyType = originalSearch.propertyType;
					emailData.propertyUse = originalSearch.propertyUse;
					emailData.homeValue = originalSearch.homeValue;
					emailData.amount = originalSearch.amount;
					emailData.zip = originalSearch.zip;
					emailData.fico = originalSearch.fico;

					var config = {
						'headers': {'Content-Type': 'application/json'}
					}

					var headers = new Headers();
					headers.append('Content-Type', 'application/x-www-form-urlencoded');
					var options = { headers: headers };

					var data = {};
					data.emailData = emailData;
					if (window.location.hostname !== 'localhost') {
						$.ajax({
							type: 'POST',
							url:'https://hooks.zapier.com/hooks/catch/1979434/1x55u9/',
							data: data,
							success: function(data, err) {
								console.log(data, err);
							}
						})
					} else {
						console.log('Not sending notification, dummy data:', data.emailData);
					}
				}

				$scope.searchFunction = function(initialSearch) {
					if (initialSearch) {
						$.ajax({
							url: "https://api.ipify.org?format=json",
							success: function (response) {
								sendEmailNotification(response.ip)
							},
							error: function (error) {
								sendEmailNotification('Service Unavailable')
							}
						})

					}
					$scope.searching = true;
					$scope.setLoanAmounts();
					$('.ui.modal').modal({allowMultiple: true});
					$('#lpModalResult').modal('show');


					var companyId = $scope.shareRate.company.id;
					if($scope.ernstCompanySettings == null || $scope.ernstServiceDown) {
						$scope.postShareRate();
					} else {
						$scope.wrapperErnst = {
							miniSearch : 	$scope.shareRate.miniPricerPref.search,
							ernstFeeSettings: $scope.ernstCompanySettings.ernstFeeSettings,
							ernstIndexes: null,
							closingCost : $scope.shareRate.miniPricerPref.originalSearch.closingCost,
							aprCodes: $scope.ernstCompanySettings.aprCodes

						}
						$http.post(rootPath + 'rest/ernstIntegrationController' + '/generateRequestMiniPricer/' +companyId, $scope.wrapperErnst ).success(
							function(data){
								console.log("data after Call: ", data)
								$scope.closingCost = data;
								$scope.shareRate.miniPricerPref.originalSearch.closingCost = $scope.closingCost;
								$scope.postShareRate();

							}).error(function (data, status, headers, config) {
								console.log("Ernst service is down")
								$scope.ernstServiceDown = true;
								$scope.postShareRate();
								PKG.common.ui.JNotify.ShowError("Ernst Services are currently down please contact Lender Price if you with to use their service.");

							});

						}


					}
					var getParameter = function(sParam) {
						var sPageURL = window.location.search.substring(1);
						var sURLVariables = sPageURL.split('&');
						for (var i = 0; i < sURLVariables.length; i++)
						{
							var sParameterName = sURLVariables[i].split('=');
							if (sParameterName[0] == sParam)
							{
								return sParameterName[1];
							}
						}

					}

					$scope.retrieveErnstSettings = function() {
						$http.get(rootPath + 'rest/ernstIntegrationController/getMyLatestQuestion/' + $scope.shareRate.company.id  ).success(
							function(data){
								console.log("Got ernst data", data)
								$scope.ernstCompanySettings = data;
							}).error(function (data, status, headers, config) {
								$scope.ernstServiceDown = true;
								PKG.common.ui.JNotify.ShowError("Ernst Services are currently down please contact Lender Price if you with to use their service.");
							});
						}

						$scope.init = function() {
							$scope.dynamicTheme = getParameter("theme");
							$scope.ernstCompanySettings = null;

							$http.get($scope.webApi + 'public/rest/share/rate/byRef/' + ref).success(
								function(shareRate) {
									$scope.shareRate = shareRate;
									if ($scope.shareRate.miniPricerPref.search.loanPurpose == 'Purchase') {
										$scope.selectedIndex = 0;
									} else {
										$scope.selectedIndex = 1;
									}
									$scope.retrieveErnstSettings();
									$scope.initDefaultPricing();
									//                              $scope.searchFunction();
								}).error(function (data, status, headers, config) {
									console.warn("Could not get data by ref. Config:");
									console.log(config);
								});

								$scope.$watch("shareRate.miniPricerPref.search.zip", function() {
									if (!$scope.shareRate.miniPricerPref)
									return;
									$http.get($scope.webApi + '/constant/zip/' + $scope.shareRate.miniPricerPref.search.zip)
									.success(function(zipCode) {
										$scope.vars.city = zipCode.primary_city;
										$scope.vars.county = zipCode.county;
										$scope.vars.state = zipCode.state;
									}
								);
							});

							$scope.$watch("model.propertyAddress.zip", function() {
								if (!$scope.model.propertyAddress)
								return;
								$http.get($scope.webApi + '/constant/zip/' + $scope.model.propertyAddress.zip)
								.success(function(zipCode) {
									$scope.model.propertyAddress.city = zipCode.primary_city;
									$scope.model.propertyAddress.county = zipCode.county;
									$scope.model.propertyAddress.state = zipCode.state;
								}
							);
						});
					}


					$scope.showAlert = function(ev, title, message) {
						alert(message);
					};

					$scope.onTabSelected = function(lp) {
						$scope.shareRate.miniPricerPref.search.loanPurpose = lp;
						$scope.searchFunction();
					}

					$scope.model = {}
					$scope.chooseRate = function(ev, search, loanCriteria, result) {
						$scope.currentLoanCriteria = loanCriteria;
						$scope.currentResult = result;
						$scope.currentSearch = search;

						$('.ui.modal').modal({allowMultiple: true});
						$('#lpModalContact').modal('show');
					}

					$scope.closeModalResult = function() {
						$('#lpModalResult').modal('hide');
					}
					$scope.send = function() {
						if (!$scope.model.firstname || !$scope.model.email || !$scope.model.lastname || !$scope.model.phone
							|| $scope.model.firstname == "" || $scope.model.email == ""  || $scope.model.lastname == "" || $scope.model.phone == "") {
								$scope.error = true;
							} else {
								$scope.error = false;
								$http.post($scope.rootPath + "public/rest/share/rate/record", angular.toJson({
									ref: $scope.shareRate.id,
									contact: $scope.model,
									search: $scope.currentSearch,
									loanCriteria: $scope.currentLoanCriteria,
									result: $scope.currentResult
								})).then(
									function successCallback(response) {
										$('#lpModalResult').modal('hide');
										$('#lpModalContact').modal('hide');
										$('#lpModalThanksSubmitContact').modal('show');
									}, function errorCallback(response) {

									}
								);
							}

						}
						$scope.mapping = function(cd) {
							if (cd.amount === undefined || cd.amount == null) {
								return "";
							}
							var str = cd.description;
							str = str.replace(/^[0-9]+] /, '');

							if (str.indexOf(" (Points) x ") >= 0) {
								if (cd.amount > 0)
								return "Cost";
								else
								return "Credits";
							}
							return str;
						}

						$scope.init();

					});

					angular.bootstrap(document.getElementById(elementId), ['mini-pricer']);
				});
			});
			
