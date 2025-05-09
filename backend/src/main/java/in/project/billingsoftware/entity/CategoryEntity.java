package in.project.billingsoftware.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.sql.Timestamp;

// @Entity         → Marks this class as a JPA entity (mapped to a DB table).
// @Table(name=…)  → Specifies the table name in the database.
// @Builder        → Lombok annotation to create builder pattern for this class.
// @Data           → Lombok annotation that auto-generates getters, setters, toString, etc.

// Entity = A Java class that represents a table in the database.
// Each instance = one row in the table.

@Entity
@Table(name = "category")
@Builder
@Data
public class CategoryEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true)
    private String categoryId;
    @Column(unique = true)
    private String name;
    private String description;
    private String bgColour;
    private String imgUrl;
    @CreationTimestamp
    @Column(updatable = false)
    private Timestamp createdAt;
    @UpdateTimestamp
    private Timestamp updatedAt;
}
