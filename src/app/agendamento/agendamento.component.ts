import { NodeWithI18n } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-agendamento',
  templateUrl: './agendamento.component.html',
  styleUrls: ['./agendamento.component.css']
})
export class AgendamentoComponent implements OnInit {

  public dataEmTexto: string;

  constructor() { }

  ngOnInit(): void {

    const d = new Date();
    const mo = new Intl.DateTimeFormat('pt-BR', { month: 'short' }).format(d)
    const da = new Intl.DateTimeFormat('pt-BR', { day: '2-digit' }).format(d)
    
    this.dataEmTexto = `${da} ${mo}`;

  }

}
