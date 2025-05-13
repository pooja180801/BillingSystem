package in.project.billingsoftware.service;

import in.project.billingsoftware.io.CategoryRequest;
import in.project.billingsoftware.io.CategoryResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

//In Spring Boot, a service class contains the business logic of your application.
// It's where you process data, apply rules, or call repositories to interact with the database
// — separating logic from the controller.
public interface CategoryService {
    CategoryResponse add(CategoryRequest req, MultipartFile file);

    List<CategoryResponse> read();

    void delete(String categoryId);
}
