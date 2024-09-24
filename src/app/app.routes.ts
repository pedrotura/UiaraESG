import { Routes } from '@angular/router';
import { PortalComponent } from './components/portal/portal.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { PessoasComponent } from './components/pessoas/pessoas.component';
import { EmpresasComponent } from './components/empresas/empresas.component';
import { LoginComponent } from './components/login/login.component';
import { SenhaResetComponent } from './components/senha-reset/senha-reset.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { PerguntasComponent } from './components/perguntas/perguntas.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

export const routes: Routes = [
    { path: '', component: PortalComponent },
    { path: 'home', component: HomepageComponent },
    { path: 'pessoas', component: PessoasComponent },
    { path: 'empresas', component: EmpresasComponent },
    { path: 'login', component: LoginComponent },
    { path: 'senha-reset', component: SenhaResetComponent },
    { path: 'cadastro', component: CadastroComponent },
    { path: 'perguntas', component: PerguntasComponent },
    { path: '**', component: PageNotFoundComponent }

];
