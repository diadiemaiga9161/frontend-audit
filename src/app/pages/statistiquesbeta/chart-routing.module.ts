import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StatistiquesComponent } from './statistiques/statistiques.component';


const routes: Routes = [
    {
        path: 'apex',
        component: StatistiquesComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ChartRoutingModule { }
