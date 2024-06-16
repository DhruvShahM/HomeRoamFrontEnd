import { Component, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CategoryService } from '../../../shared/Services/category.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { Category } from '../../../shared/Models/category-model';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [
    FontAwesomeModule
  ],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent {
  categoryService = inject(CategoryService);

  categories: Category[] | undefined;
  currentActivateCategory = this.categoryService.getCategoryByDefault();

  isHome = false;
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.listenRouter();
    this.currentActivateCategory.activated = false;
    this.fetchCategories();
  }

  private listenRouter() {
    this.router.events.pipe(
      filter((evt): evt is NavigationEnd => evt instanceof NavigationEnd)
    )
      .subscribe({
        next: (evt: NavigationEnd ) => {
          this.isHome = evt.url.split("?")[0] === "/";
          // && evt.url.indexOf("?") === -1
          if (this.isHome && evt.url!=='/') {
            const categoryName=evt.url.replace("/?category=","");
            const categoryByTechnicalName = this.categoryService.getCategoryByTechnicalName(categoryName);
            this.categoryService.changeCategory(categoryByTechnicalName!);
          }
          
          if(evt.url==='/'){
            const categoryByTechnicalName = this.categoryService.getCategoryByTechnicalName("ALL");
            this.categoryService.changeCategory(categoryByTechnicalName!);
          }
        },
      });
    }

  private fetchCategories() {
    this.categories = this.categoryService.getCategories();
  }

  onChangeCategory(category: Category) {
    this.activateCategory(category);
    this.router.navigate([], {
      queryParams: {"category": category.technicalName},
      relativeTo: this.activatedRoute
    })
  }

  private activateCategory(category: Category) {
    this.currentActivateCategory.activated = false;
    this.currentActivateCategory = category;
    this.currentActivateCategory.activated = true;
  }
}
