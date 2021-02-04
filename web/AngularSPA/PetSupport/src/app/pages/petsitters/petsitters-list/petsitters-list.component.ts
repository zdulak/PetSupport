import {Component, Input, OnChanges, OnInit, SimpleChange} from '@angular/core';
import {Petsitter} from '../../../common/models/petsitter';
import {PetsittersService} from '../petsitters.service';
import {FindPetsitterLongForm, FindPetsitterShortForm} from '../../../common/models/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';


@Component({
  selector: 'app-petsitters-list',
  templateUrl: './petsitters-list.component.html',
  styleUrls: ['./petsitters-list.component.css']
})
export class PetsittersListComponent implements OnInit, OnChanges {
  public petsitterList: Petsitter[];
  @Input()
  public longForm: FindPetsitterLongForm;
  public petSitterFilterData: FindPetsitterShortForm | null;

  constructor(private petsitterService: PetsittersService,
              private route: ActivatedRoute,
              private router: Router,
            ) {
    this.petSitterFilterData = this.router.getCurrentNavigation().extras.state as FindPetsitterShortForm;
  }

  ngOnInit(): void {
    const mockData: FindPetsitterShortForm = {city: 'Warsaw', serviceId: '1'};
    const formData = this.petSitterFilterData ?? mockData;

    this.petsitterService.getPetsitters(formData).subscribe((data) => {
      this.petsitterList = data;
      this.setParamsToUrl(formData);
    });

  }

  public ngOnChanges(changes): void {
    const formData = changes.longForm.currentValue;
    if (formData) {
      this.petsitterService.getPetsitters(formData).subscribe(data => this.petsitterList = data);
      this.setParamsToUrl(formData);
    }
  }
  public setParamsToUrl(formData): void {
    void this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: formData as Params,
        queryParamsHandling: 'merge', // remove to replace all query params by provided
      });
  }
}

// {
//   Id: 1,
//     Name: 'Jan',
//   Surname: 'Kowalski',
//   coordinates: {
//   lat: 52,
//     lon: 21
// },
//   imageId: 'https://cdn.pixabay.com/photo/2015/05/18/23/53/norway-772991_960_720.jpg',
//     City: 'Warszawa',
//   Description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer et cursus dui, ac fermentum metus. Aliquam ultrices orci sapien, et mattis risus facilisis at. Duis ut augue mi. Mauris tristique ligula id erat faucibus blandit. Duis sed congue mauris, quis tempor ipsum. Donec nec odio eu ligula blandit posuere id a enim. In faucibus dui aliquam lorem placerat semper.',
//   Price: 15,
// },
// {
//   Id: 2,
//     Name: 'Jacek',
//   Surname: 'Sasin',
//   coordinates: {
//   lat: 52,
//     lon: 21.02
// },
//   imageId: 'https://i.iplsc.com/jacek-sasin/000A3HKWCII40PIF-C123-F4.webp',
//     City: 'Kraków',
//   Description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer et cursus dui, ac fermentum metus. Aliquam ultrices orci sapien, et mattis risus facilisis at. Duis ut augue mi. Mauris tristique ligula id erat faucibus blandit. Duis sed congue mauris, quis tempor ipsum. Donec nec odio eu ligula blandit posuere id a enim. In faucibus dui aliquam lorem placerat semper.',
//   Price: 70000000,
// },
// {
//   Id: 3,
//     Name: 'Martyna',
//   Surname: 'Wojciechowska',
//   coordinates: {
//   lat: 52,
//     lon: 21.04
// },
//   City: 'Kraków',
//     imageId: 'https://dziendobry.tvn.pl/media/cache/content_cover/en-01347491-1626-jpg.jpg',
//   Description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer et cursus dui, ac fermentum metus. Aliquam ultrices orci sapien, et mattis risus facilisis at. Duis ut augue mi. Mauris tristique ligula id erat faucibus blandit. Duis sed congue mauris, quis tempor ipsum. Donec nec odio eu ligula blandit posuere id a enim. In faucibus dui aliquam lorem placerat semper.',
//   Price: 0,
// },
// {
//   Id: 4,
//     Name: 'Wojciech',
//   Surname: 'Cejrowski',
//   coordinates: {
//   lat: 52,
//     lon: 21.06
// },
//   City: 'Arizona',
//     imageId: 'https://mambiznes.pl/wp-content/uploads/2019/08/forum-0428574145.jpg',
//   Description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer et cursus dui, ac fermentum metus. Aliquam ultrices orci sapien, et mattis risus facilisis at. Duis ut augue mi. Mauris tristique ligula id erat faucibus blandit. Duis sed congue mauris, quis tempor ipsum. Donec nec odio eu ligula blandit posuere id a enim. In faucibus dui aliquam lorem placerat semper.',
//   Price: 30,
// }
