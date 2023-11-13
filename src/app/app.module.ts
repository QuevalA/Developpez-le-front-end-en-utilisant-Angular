import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './pages/home/home.component';
import {NotFoundComponent} from './pages/not-found/not-found.component';
import {ChartPieComponent} from './components/chart-pie/chart-pie.component';
import {ChartLineComponent} from './components/chart-line/chart-line.component';
import {DetailComponent} from './pages/detail/detail.component';
import {LineChartModule, NgxChartsModule, PieChartModule} from "@swimlane/ngx-charts";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations:
    [AppComponent, HomeComponent, NotFoundComponent, ChartPieComponent, ChartLineComponent, DetailComponent],
  imports:
    [BrowserModule, AppRoutingModule, HttpClientModule, PieChartModule, LineChartModule, NgxChartsModule, BrowserAnimationsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
