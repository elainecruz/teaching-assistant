import { Component, OnInit } from '@angular/core';
import { Aluno } from '../../../../common/aluno';
import { AlunoService } from './alunos.service';

@Component({
  selector: 'app-root',
  templateUrl: './alunos.component.html',
  styleUrls: ['./alunos.component.css']
})

export class AlunosComponent implements OnInit {

  aluno: Aluno = new Aluno();
  alunos: Aluno[] = [];
  cpfduplicado: boolean = false;

  constructor(private alunoService: AlunoService) { }

  criarAluno(a: Aluno): void {
    this.alunoService.criar(a)
      .subscribe(
        ar => {
          if (ar) {
            this.alunos.push(ar);
            this.aluno = new Aluno();
          } else {
            this.cpfduplicado = true;
          }
        },
        msg => { alert(msg.message); }
      );
  }

  removerAluno(a: Aluno): void {
    this.alunoService.remover(a)
      .subscribe(a => {
        if (a) {
          this.alunos = this.alunos.filter(b => b.cpf !== a.cpf);
        }
      })
  }

  ngOnInit(): void {
    this.alunoService.getAlunos()
      .subscribe(
        as => { this.alunos = as; },
        msg => { alert(msg.message); }
      );
  }

}