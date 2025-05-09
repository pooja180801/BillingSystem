package in.project.billingsoftware.repository;

import in.project.billingsoftware.entity.CategoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

// Extends JpaRepository to provide CRUD operations for CategoryEntity.
// CategoryEntity is the entity type, and Long is the type of its ID field.
// No need to write implementation; JpaRepository handles it automatically.
public interface CategoryRepository extends JpaRepository<CategoryEntity, Long> {
    Optional<CategoryEntity> findByCategoryId(String categoryId);
}
