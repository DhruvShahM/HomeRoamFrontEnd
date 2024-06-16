import { Component, EventEmitter, OnInit, Output, inject, input } from '@angular/core';
import { CategoryName, Category } from '../../../../shared/Models/category-model';
import { CategoryService } from '../../../../shared/Services/category.service';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-category-step',
  standalone: true,
  templateUrl: './category-step.component.html',
  styleUrls: ['./category-step.component.scss'],  
  imports: [
    FaIconComponent
  ],
})
export class CategoryStepComponent implements OnInit {

  categoryName = input.required<CategoryName>();

  @Output()
  categoryChange = new EventEmitter<CategoryName>();

  @Output()
  stepValidityChange = new EventEmitter<boolean>();

  categoryService = inject(CategoryService);
  categories: Category[] | undefined;

  ngOnInit(): void {
    this.categories = this.categoryService.getCategories();
  }

  onSelectCategory(newCategory: CategoryName): void {
    this.categoryChange.emit(newCategory);
    this.stepValidityChange.emit(true);
  }
}
