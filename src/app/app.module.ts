import { LocalizedDatePipe } from './localize-ddate.pipe';
import { ExcerptFilter } from './excerpt.pipe';
import { HighlightSearch, } from './highlight.pipe';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClient, HttpClientModule } from '@angular/common/http';

// Providers
import { CacheService } from './cache.service';

// Bootstrap
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxCarouselModule } from 'ngx-carousel';

// Gmap
import { AgmCoreModule } from '@agm/core';

import 'hammerjs';

// Translation
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { registerLocaleData } from '@angular/common';
import localeId from '@angular/common/locales/id';

// Loading Bar
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { PasswordStrengthBarModule } from 'ng2-password-strength-bar';

// Countdown Timer
import { CountdownTimerModule } from 'ngx-countdown-timer';

// Google Recaptcha
import { RECAPTCHA_SETTINGS, RecaptchaSettings, RecaptchaModule } from 'ng-recaptcha';

// Reorder Sort
import { OrderModule } from 'ngx-order-pipe';

// User Idle
import { UserIdleModule } from 'angular-user-idle';

//  Page 
import { AppComponent } from './app.component';
import { HomeComponent } from './public/home/home.component';
import { AboutComponent } from './public/about/about.component';
import { FooterComponent } from './general/footer/footer.component';
import { ProductComponent } from './public/product/product.component';
import { HospitalComponent } from './public/hospital/hospital.component';
import { PortfolioComponent } from './public/portfolio/portfolio.component';
import { CareerComponent } from './public/career/career.component';
import { ContactComponent } from './public/contact/contact.component';
import { ActivationComponent } from './public/activation/activation.component';
import { HeaderHomeComponent } from './public/header-home/header-home.component';
import { HeaderPageComponent } from './public/header-page/header-page.component';
import { LoginComponent } from './public/login/login.component';
import { ForgetPasswordComponent } from './public/forget-password/forget-password.component';
import { BlogComponent } from './public/blog/blog.component';
import { FormDownloadsComponent } from './public/form-downloads/form-downloads.component';
import { FaqComponent } from './public/faq/faq.component';
import { OfficeNetworkComponent } from './public/office-network/office-network.component';
import { DetailAwardComponent } from './public/detail-award/detail-award.component';
import { DetailPortfolioComponent } from './public/detail-portfolio/detail-portfolio.component';
import { FinancialReportComponent } from './public/financial-report/financial-report.component';
import { AboutChubbLifeComponent } from './public/about-chubb-life/about-chubb-life.component';
import { HeaderNonPublicComponent } from './non-public/header-non-public/header-non-public.component';
import { DashboardComponent } from './non-public/dashboard/dashboard.component';
import { MenuDashboardHorizontalComponent } from './non-public/menu-dashboard-horizontal/menu-dashboard-horizontal.component';
import { MenuDashboardVerticalComponent } from './non-public/menu-dashboard-vertical/menu-dashboard-vertical.component';
import { PersonalDataComponent } from './non-public/personal-data/personal-data.component';
import { ProposalInformationComponent } from './non-public/proposal-information/proposal-information.component';
import { PolicyInformationComponent } from './non-public/policy-information/policy-information.component';
import { ProposalDetailComponent } from './non-public/proposal-detail/proposal-detail.component';
import { EducationCenterComponent } from './public/education-center/education-center.component';
import { DetailProductComponent } from './public/detail-product/detail-product.component';
import { ContactProductComponent } from './public/contact-product/contact-product.component';
import { PolicyDetailComponent } from './non-public/policy-detail/policy-detail.component';
import { TransactionComponent } from './non-public/transaction/transaction.component';
import { TrackingComponent } from './non-public/tracking/tracking.component';
import { HistoryComponent } from './non-public/history/history.component';
import { UnitPriceComponent } from './non-public/unit-price/unit-price.component';
import { FundFactsheetComponent } from './non-public/fund-fact-sheet/fund-fact-sheet.component';
import { InboxComponent } from './non-public/inbox/inbox.component';
import { InboxDetailComponent } from './non-public/inbox-detail/inbox-detail.component';
import { ChartRupiahEquityFundComponent } from './non-public/chart-rupiah-equity-fund/chart-rupiah-equity-fund.component';
import { ChartRupiahSyariahBondFundComponent } from './non-public/chart-rupiah-syariah-bond-fund/chart-rupiah-syariah-bond-fund.component';
import { PerformanceComponent } from './non-public/performance/performance.component';
import { PrivacyPolicyComponent } from './public/privacy-policy/privacy-policy.component';
import { TermOfUseComponent } from './public/term-of-use/term-of-use.component';
import { HeaderPageToscaComponent } from './public/header-page-tosca/header-page-tosca.component';
import { HeaderPageOrangeComponent } from './public/header-page-orange/header-page-orange.component';
import { HeaderPageBlueComponent } from './public/header-page-blue/header-page-blue.component';
import { HeaderPageRedComponent } from './public/header-page-red/header-page-red.component';
import { HeaderPageGreenComponent } from './public/header-page-green/header-page-green.component';
import { HeaderPageVioletComponent } from './public/header-page-violet/header-page-violet.component';
import { TermsOfUseComponent } from './public/terms-of-use/terms-of-use.component';
import { DailyNavComponent } from './public/daily-nav/daily-nav.component';
import { ResultPageComponent } from './public/result-page/result-page.component';
import { TipsTrickComponent } from './public/tips-trick/tips-trick.component';
import { DetailTipsTrickComponent } from './public/detail-tips-trick/detail-tips-trick.component';
import { FundMonthlyComponent } from './non-public/fund-monthly/fund-monthly.component';
import { FundYearlyComponent } from './non-public/fund-yearly/fund-yearly.component';
import { HistoryDetailComponent } from './non-public/history-detail/history-detail.component';
import { CashlessTrackingDetailComponent } from './non-public/cashless-tracking-detail/cashless-tracking-detail.component';
import { ReimbursementTrackingDetailComponent } from './non-public/reimbursement-tracking-detail/reimbursement-tracking-detail.component';
import { CustomerServiceComponent } from './non-public/customer-service/customer-service.component';
import { CustomerServiceDetailComponent } from './non-public/customer-service-detail/customer-service-detail.component';
import { ChangePasswordComponent } from './non-public/change-password/change-password.component';
import { NotfoundComponent } from './general/notfound/notfound.component';
import { environment } from '../environments/environment';
import { SafeHtmlPipe } from './safeHtml.pipe';
import { EqualValidator } from './equal-validator.directive';
import { AuthGuard } from './AuthGuard';
import { DetailBlogComponent } from './public/detail-blog/detail-blog.component';


const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'about-ekreasi',
    component: AboutComponent
  },
  {
    path: 'about/financial-report',
    component: FinancialReportComponent
  },
  {
    path: 'about/about-chubb-life',
    component: AboutChubbLifeComponent
  },
  {
    path: 'privacy-policy',
    component: PrivacyPolicyComponent
  },
  {
    path: 'term-of-use',
    component: TermOfUseComponent
  },
  {
    path: 'product',
    component: ProductComponent
  },
  {
    path: 'hospital',
    component: HospitalComponent
  },
  {
    path: 'portfolio',
    component: PortfolioComponent
  },
  {
    path: 'portfolio/portfolio-detail',
    component: DetailPortfolioComponent
  },
  {
    path: 'blog/blog-detail',
    component: DetailBlogComponent
  },
  {
    path: 'career',
    component: CareerComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'auth/activation/:activationId',
    component: ActivationComponent
  },
  {
    path: 'auth/login',
    component: LoginComponent
  },
  {
    path: 'auth/forget-password',
    component: ForgetPasswordComponent
  },
  {
    path: 'blog',
    component: BlogComponent
  },
  {
    path: 'about/awards/:id',
    component: DetailAwardComponent
  },
  {
    path: 'form-downloads',
    component: FormDownloadsComponent
  },
  {
    path: 'faq',
    component: FaqComponent
  },
  {
    path: 'office-network',
    component: OfficeNetworkComponent
  },
  {
    path: 'education-center',
    component: EducationCenterComponent
  },
  {
    path: 'product/:id',
    component: DetailProductComponent
  },
  {
    path: 'contact-product',
    component: ContactProductComponent
  },
  {
    path: 'terms-of-use',
    component: TermsOfUseComponent
  },
  {
    path: 'daily-nav',
    component: DailyNavComponent
  },
  {
    path: 'result-page/:query',
    component: ResultPageComponent
  },
  {
    path: 'tips-trick',
    component: TipsTrickComponent
  },
  {
    path: 'tips-trick/:id',
    component: DetailTipsTrickComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'my-data/policy-information/:policyNo',
    component: PolicyDetailComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'transaction',
    component: TransactionComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'claim/tracking',
    component: TrackingComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'claim/history',
    component: HistoryComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'fund/unit-price',
    component: UnitPriceComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'fund/fund-fact-sheet',
    component: FundFactsheetComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'fund/performance',
    component: PerformanceComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'inbox',
    component: InboxComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'inbox-detail/:id',
    component: InboxDetailComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'my-data/personal-data',
    component: PersonalDataComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'my-data/proposal-information',
    component: ProposalInformationComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'my-data/policy-information',
    component: PolicyInformationComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'my-data/proposal-information/:ppajNo',
    component: ProposalDetailComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'fund-monthly',
    component: FundMonthlyComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'fund-yearly',
    component: FundYearlyComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'history-detail/:claimId',
    component: HistoryDetailComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'cashless-tracking-detail/:claimId',
    component: CashlessTrackingDetailComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'reimbursement-tracking-detail/:claimId',
    component: ReimbursementTrackingDetailComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'customer-service',
    component: CustomerServiceComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'customer-service-detail',
    component: CustomerServiceDetailComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '404',
    component: NotfoundComponent
  },
  {
    path: '**',
    redirectTo: '/404'
  }
];
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    AboutComponent,
    ProductComponent,
    HospitalComponent,
    PortfolioComponent,
    CareerComponent,
    ContactComponent,
    ActivationComponent,
    HeaderHomeComponent,
    HeaderPageComponent,
    LoginComponent,
    ForgetPasswordComponent,
    BlogComponent,
    FormDownloadsComponent,
    FaqComponent,
    OfficeNetworkComponent,
    DetailAwardComponent,
    DetailPortfolioComponent,
    FinancialReportComponent,
    AboutChubbLifeComponent,
    PrivacyPolicyComponent,
    TermOfUseComponent,
    HeaderNonPublicComponent,
    DashboardComponent,
    MenuDashboardHorizontalComponent,
    MenuDashboardVerticalComponent,
    PersonalDataComponent,
    ProposalInformationComponent,
    PolicyInformationComponent,
    ProposalDetailComponent,
    EducationCenterComponent,
    DetailProductComponent,
    ContactProductComponent,
    PolicyDetailComponent,
    TransactionComponent,
    TrackingComponent,
    HistoryComponent,
    UnitPriceComponent,
    FundFactsheetComponent,
    InboxComponent,
    InboxDetailComponent,
    ChartRupiahEquityFundComponent,
    ChartRupiahSyariahBondFundComponent,
    PerformanceComponent,
    HeaderPageToscaComponent,
    HeaderPageOrangeComponent,
    HeaderPageBlueComponent,
    HeaderPageRedComponent,
    HeaderPageGreenComponent,
    HeaderPageVioletComponent,
    TermsOfUseComponent,
    DailyNavComponent,
    ResultPageComponent,
    TipsTrickComponent,
    DetailTipsTrickComponent,
    FundMonthlyComponent,
    FundYearlyComponent,
    HistoryDetailComponent,
    CashlessTrackingDetailComponent,
    ReimbursementTrackingDetailComponent,
    CustomerServiceComponent,
    CustomerServiceDetailComponent,
    ChangePasswordComponent,
    NotfoundComponent,
    HighlightSearch,
    ExcerptFilter,
    LocalizedDatePipe,
    SafeHtmlPipe,
    EqualValidator,
    DetailBlogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    NgxCarouselModule,
    NgbModule.forRoot(),
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAOeOWlCQqgmJjo6lM6XAQyeW1cI3HgiQk'
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    LoadingBarHttpClientModule,
    LazyLoadImageModule,
    SweetAlert2Module.forRoot(),
    PasswordStrengthBarModule,
    CountdownTimerModule.forRoot(),
    RecaptchaModule.forRoot(),
    OrderModule,
    UserIdleModule.forRoot({ idle: 240, timeout: 60, ping: 120 })
  ],
  providers: [CacheService,
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: { siteKey: environment.googleRecaptchaKey } as RecaptchaSettings,
    },
    AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, environment.apiEndpoint + "/language/frontend/lang/");
}

registerLocaleData(localeId);