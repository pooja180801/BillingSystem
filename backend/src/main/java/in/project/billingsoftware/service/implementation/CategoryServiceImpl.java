package in.project.billingsoftware.service.implementation;

import in.project.billingsoftware.entity.CategoryEntity;
import in.project.billingsoftware.io.CategoryRequest;
import in.project.billingsoftware.io.CategoryResponse;
import in.project.billingsoftware.repository.CategoryRepository;
import in.project.billingsoftware.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

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
