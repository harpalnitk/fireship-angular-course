import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { map, tap } from 'rxjs/operators';
import { SeoService } from 'src/app/services/seo.service';

import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.scss']
})
export class DetailPageComponent {
  customerId: any;
  customer: Observable<any>;

  constructor(
    private route: ActivatedRoute,
    private db: AngularFirestore,
    private seo: SeoService,

  ) {}

  ngOnInit() {
    this.customerId = this.route.snapshot.paramMap.get('id');

    this.customer = this.db
      .collection('customers')
      .doc<any>(this.customerId)
      .valueChanges()
            .pipe(
        tap(cust =>
          this.seo.generateTags({
            title: cust.name,
            description: cust.bio,
            image: cust.image,
          }),
          //this map is used because if not used detail page is rendered
          //before seo can set title, description and image
          map(val=> val)
        )
      );
    // this.customer = this.data.getCustomer(this.customerId)
    //   .pipe(
    //     tap(cust =>
    //       this.seo.generateTags({
    //         title: cust.name,
    //         description: cust.bio,
    //         image: cust.image,
    //       })
    //     )
    //   );
  }
}
