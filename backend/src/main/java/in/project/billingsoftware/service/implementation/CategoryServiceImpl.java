package in.project.billingsoftware.service.implementation;

import in.project.billingsoftware.entity.CategoryEntity;
import in.project.billingsoftware.io.CategoryRequest;
import in.project.billingsoftware.io.CategoryResponse;
import in.project.billingsoftware.repository.CategoryRepository;
import in.project.billingsoftware.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;
    @Override
    public CategoryResponse add(CategoryRequest req) {
        CategoryEntity categoryEntity = convertToEntity(req);
        categoryEntity = categoryRepository.save(categoryEntity);
        return convertToResponse(categoryEntity);
    }

    @Override
    public List<CategoryResponse> read() {
        return categoryRepository.findAll()
                .stream()
                .map(categoryEntity -> convertToResponse(categoryEntity))
                .collect(Collectors.toList());
    }

    @Override
    public void delete(String categoryId) {
        CategoryEntity existingCategory = categoryRepository.findByCategoryId(categoryId)
                .orElseThrow(() -> new RuntimeException("Category not found: "+categoryId));

        categoryRepository.delete(existingCategory);
    }

    private CategoryResponse convertToResponse(CategoryEntity categoryEntity) {
        return CategoryResponse.builder()
                .categoryId(categoryEntity.getCategoryId())
                .name(categoryEntity.getName())
                .description(categoryEntity.getDescription())
                .bgColour(categoryEntity.getBgColour())
                .imgUrl(categoryEntity.getImgUrl())
                .createdAt(categoryEntity.getCreatedAt())
                .updatedAt(categoryEntity.getUpdatedAt())
                .build();
    }

    private CategoryEntity convertToEntity(CategoryRequest req) {
        return CategoryEntity.builder()
                .categoryId(UUID.randomUUID().toString())
                .name(req.getName())
                .description(req.getDescription())
                .bgColour(req.getBgColour())
                .build();
    }
}
