package in.project.billingsoftware.controller;

import in.project.billingsoftware.io.CategoryRequest;
import in.project.billingsoftware.io.CategoryResponse;
import in.project.billingsoftware.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

//A @RestController in Spring Boot handles HTTP requests (GET, POST, PUT, DELETE),
// acts as a bridge between the client and backend, processes requests (with services),
// and returns data, usually in JSON format.

//Maps all the HTTP requests starting with /categories to this class.
@RestController
@RequestMapping("/categories")

// @RequiredArgsConstructor is a Lombok annotation that generates a constructor
// with parameters for all final fields (like categoryService) so Spring can inject them.
@RequiredArgsConstructor

public class CategoryController {

    private final CategoryService categoryService;

    //Binds the body of the HTTP request to the CategoryRequest parameter in the method.
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public CategoryResponse addCategory(@RequestBody CategoryRequest req){
        return categoryService.add(req);
    }

    @GetMapping
    public List<CategoryResponse> fetchCategories(){
        return categoryService.read();
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{categoryId}")
    public void remove(@PathVariable String categoryId){
        try {
            categoryService.delete(categoryId);
        } catch (Exception e){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Category Not Found "+ categoryId);
        }
    }
}
