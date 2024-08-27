import { Routes } from '@angular/router';
import { HelloWorldComponent } from './hello-world/hello-world.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [ 
    {
        path: '',
        title: 'App Home Page',
        component: HomeComponent,
    },
    {
    path: 'list',
    title: 'App List Page',
    component: HelloWorldComponent,
    },
];
