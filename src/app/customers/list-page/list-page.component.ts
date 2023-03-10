import { AngularFirestore } from '@angular/fire/compat/firestore';
import { SeoService } from './../../services/seo.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss'],
})
export class ListPageComponent implements OnInit {
  customers: any;

  constructor(private seo: SeoService, private db: AngularFirestore) {}

  ngOnInit(): void {

    console.log('Inside ngOninit of customers list');
    this.seo.generateTags({
      title: 'Customer List',
      description: 'A list filled with customers',
    });

    this.customers = this.db
      .collection('customers')
      .valueChanges({ idField: 'id' });
  }
}
