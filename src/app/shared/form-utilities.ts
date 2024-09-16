export class RegexValidations {

    static validarCNPJ(): void {
        const cnpj = document.querySelector('#cnpj') as HTMLInputElement;

        cnpj.addEventListener('input', function () {
            cnpj.value = cnpj.value
                .replace(/\D/g, "")
                .replace(/(\d{2})(\d)/, "$1.$2")
                .replace(/(\d{3})(\d)/, "$1.$2")
                .replace(/(\d{3})(\d)/, "$1/$2")
                .replace(/(\d{4})(\d)/, "$1-$2");
        });
    }

    static validarCEP(): void {
        const cep = document.querySelector('#cep') as HTMLInputElement;

        cep.addEventListener('input', function () {
            cep.value = cep.value
                .replace(/\D/g, "")
                .replace(/(\d{5})(\d)/, "$1-$2");
        });
    }

    static validarCPF(): void {
        const cpf = document.querySelector('#cpf') as HTMLInputElement;

        cpf.addEventListener('input', function () {
            cpf.value = cpf.value
                .replace(/\D/g, "")
                .replace(/(\d{3})(\d)/, "$1.$2")
                .replace(/(\d{3})(\d)/, "$1.$2")
                .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
        });
    }

    static validarEndereco(): void {
        const numeroEndereco = document.querySelector('#numeroEndereco') as HTMLInputElement;

        numeroEndereco.addEventListener('input', function () {
            numeroEndereco.value = numeroEndereco.value
                .replace(/\D/, "");
        });
    }

    static validarTelefone(): void {
        const telefone = document.querySelector('#telefone') as HTMLInputElement;

        telefone.addEventListener('input', function () {
            telefone.value = telefone.value
                .replace(/\D/g, "")
                .replace(/(\d)/, "($1")
                .replace(/(\d{2})(\d)/, "$1) $2")
                .replace(/(\d{4})(\d)/, "$1-$2")
                .replace(/^(\(\d{2}\) )(\d{4})-(\d)(\d{4})/, "$1$2$3-$4");
        });
    }
}

export class PasswordFormatting {
    static formatarCampoSenha(): void {

        const senha = document.querySelectorAll('.senha') as NodeListOf<HTMLInputElement>;
        const iconeSenha = document.querySelectorAll('.senha-icone') as NodeListOf<HTMLElement>;

        for (let i = 0; i < senha.length; i++) {
            iconeSenha[i].addEventListener('click', function () {
                if (senha[i].type === 'password') {
                    senha[i].type = 'text';
                    iconeSenha[i].classList.remove('bi-eye-slash');
                    iconeSenha[i].classList.add('bi-eye');
                } else {
                    senha[i].type = 'password';
                    iconeSenha[i].classList.remove('bi-eye');
                    iconeSenha[i].classList.add('bi-eye-slash');
                }
            });
        }
    }
}