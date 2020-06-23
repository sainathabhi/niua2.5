import { MaintenanceRoutingModule } from './maintenance-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '@sunbird/core';
import { SharedModule } from '@sunbird/shared';
import { MaintenanceComponent } from './components/maintenance/maintenance.component';
import { SharedFeatureModule } from '@sunbird/shared-feature';
@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    SharedModule,
    MaintenanceRoutingModule,
    SharedFeatureModule
  ],
  declarations: [MaintenanceComponent],
  exports: [MaintenanceComponent]
})
export class MaintenanceModule { }