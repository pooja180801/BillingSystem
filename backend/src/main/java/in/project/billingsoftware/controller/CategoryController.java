package in.project.billingsoftware.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import in.project.billingsoftware.io.CategoryRequest;
import in.project.billingsoftware.io.CategoryResponse;
import in.project.billingsoftware.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

//A @RestController in Spring Boot handles HTTP requests (GET, POST, PUT, DELETE),
// acts as a bridge between the client and backend, processes requests (with services),
// and returns data, usually in JSON format.

//Maps all the HTTP requests starting with /categories to this class.
@RestController

// @RequiredArgsConstructor is a Lombok annotation that generates a constructor
// with parameters for all final fields (like categoryService) so Spring can inject them.
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    //Binds the body of the HTTP request to the CategoryRequest parameter in the method.
    //@RequestPart is used to extract parts of a multipart/form-data request.
    @PostMapping("/admin/categories")
    @ResponseStatus(HttpStatus.CREATED)
    public CategoryResponse addCategory(@RequestPart("category") String categoryString,
                                        @RequestPart("file")MultipartFile file){
        ObjectMapper objectMapper = new ObjectMapper();
        CategoryRequest request = null;

        try {
            // parsing json into a java object
            request = objectMapper.readValue(categoryString, CategoryRequest.class);
            return categoryService.add(request, file);
        }catch (JsonProcessingException e){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Exception occured while parsing the json"+e.getMessage());
        }
    }

    @GetMapping
    public List<CategoryResponse> fetchCategories(){
        return categoryService.read();
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/admin/categories/{categoryId}")
    public void remove(@PathVariable String categoryId){
        try {
            categoryService.delete(categoryId);
        } catch (Exception e){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Category Not Found "+ categoryId);
        }
    }
}
