import { Routes } from '@angular/router';
import { PortalComponent } from './components/portal/portal.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { PessoasComponent } from './components/pessoas/pessoas.component';
import { EmpresasComponent } from './components/empresas/empresas.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { PerguntasComponent } from './components/perguntas/perguntas.component';

export const routes: Routes = [
    { path: '', component: PortalComponent },
    { path: 'home', component: HomepageComponent },
    { path: 'pessoas', component: PessoasComponent },
    { path: 'empresas', component: EmpresasComponent },
    { path: 'cadastro', component: CadastroComponent },
    { path: 'perguntas', component: PerguntasComponent }
];
