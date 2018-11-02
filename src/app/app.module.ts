import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

// Bootstrap
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NgxCarouselModule } from 'ngx-carousel';

// Gmap
import { AgmCoreModule } from '@agm/core';

import 'hammerjs';

//  Page 
import { AppComponent } from './app.component';
import { HomeComponent } from './public/home/home.component';
import { AboutComponent } from './public/about/about.component';
import { FooterComponent } from './general/footer/footer.component';
import { ProductComponent } from './public/product/product.component';
import { HospitalComponent } from './public/hospital/hospital.component';
import { NewsComponent } from './public/news/news.component';
import { AgentsComponent } from './public/agents/agents.component';
import { ContactComponent } from './public/contact/contact.component';
import { ActivationComponent } from './public/activation/activation.component';
import { HeaderHomeComponent } from './public/header-home/header-home.component';
import { HeaderPageComponent } from './public/header-page/header-page.component';
import { LoginComponent } from './public/login/login.component';
import { ForgetPasswordComponent } from './public/forget-password/forget-password.component';
import { AwardsComponent } from './public/awards/awards.component';
import { FormDownloadsComponent } from './public/form-downloads/form-downloads.component';
import { FaqComponent } from './public/faq/faq.component';
import { OfficeNetworkComponent } from './public/office-network/office-network.component';
import { DetailAwardComponent } from './public/detail-award/detail-award.component';
import { DetailNewsComponent } from './public/detail-news/detail-news.component';
import { FinancialReportComponent } from './public/financial-report/financial-report.component';
import { AboutekreasiLifeComponent } from './public/about-ekreasi-life/about-ekreasi-life.component';
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
import { FundFactsheetComponent} from './non-public/fund-fact-sheet/fund-fact-sheet.component';
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

const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'about/about-ekreasi',
    component: AboutComponent
  },
  {
    path: 'about/financial-report',
    component: FinancialReportComponent
  },
  {
    path: 'about/about-ekreasi-life',
    component: AboutekreasiLifeComponent
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
    path: 'news',
    component: NewsComponent
  },
  {
    path: 'news/:id',
    component: DetailNewsComponent
  },
  {
    path: 'agents',
    component: AgentsComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'auth/activation',
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
    path: 'about/awards',
    component: AwardsComponent
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
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'my-data/personal-data',
    component: PersonalDataComponent
  },
  {
    path: 'my-data/proposal-information',
    component: ProposalInformationComponent
  },
  {
    path: 'my-data/policy-information',
    component: PolicyInformationComponent
  },
  {
    path: 'my-data/proposal-information/proposal-detail',
    component: ProposalDetailComponent
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
    path: 'my-data/policy-information/policy-detail',
    component: PolicyDetailComponent
  },
  {
    path: 'transaction',
    component: TransactionComponent
  },
  {
    path: 'claim/tracking',
    component: TrackingComponent
  },
  {
    path: 'claim/history',
    component: HistoryComponent
  },
  {
    path: 'fund/unit-price',
    component: UnitPriceComponent
  },
  {
    path: 'fund/fund-fact-sheet',
    component: FundFactsheetComponent
  },
  {
    path: 'fund/performance',
    component: PerformanceComponent
  },
  {
    path: 'inbox',
    component: InboxComponent
  },
  {
    path: 'inbox-detail',
    component: InboxDetailComponent
  },
  {
    path: 'terms-of-use',
    component: TermsOfUseComponent
  },
  {
    path: 'daily-nav',
    component:DailyNavComponent
  },
  {
    path: 'result-page',
    component:ResultPageComponent
  },
  {
    path: 'tips-trick',
    component:TipsTrickComponent
  },
  {
    path: 'detail-tips-trick',
    component:DetailTipsTrickComponent
  },
  {
    path: 'fund-monthly',
    component:FundMonthlyComponent
  },
  {
    path: 'fund-yearly',
    component:FundYearlyComponent
  },
  {
    path: 'history-detail',
    component:HistoryDetailComponent
  },
  {
    path: 'cashless-tracking-detail',
    component:CashlessTrackingDetailComponent
  },
  {
    path: 'reimbursement-tracking-detail',
    component:ReimbursementTrackingDetailComponent
  },
  {
    path: 'customer-service',
    component:CustomerServiceComponent
  },
  {
    path: 'customer-service-detail',
    component:CustomerServiceDetailComponent
  },
  {
    path: 'change-password',
    component:ChangePasswordComponent
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
    NewsComponent,
    AgentsComponent,
    ContactComponent,
    ActivationComponent,
    HeaderHomeComponent,
    HeaderPageComponent,
    LoginComponent,
    ForgetPasswordComponent,
    AwardsComponent,
    FormDownloadsComponent,
    FaqComponent,
    OfficeNetworkComponent,
    DetailAwardComponent,
    DetailNewsComponent,
    FinancialReportComponent,
    AboutekreasiLifeComponent,
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
    ChangePasswordComponent
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
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
