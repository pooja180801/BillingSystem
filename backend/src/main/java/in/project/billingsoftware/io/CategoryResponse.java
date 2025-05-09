package in.project.billingsoftware.io;

import lombok.Builder;
import lombok.Data;

import java.sql.Timestamp;

@Data
@Builder
public class CategoryResponse {
    private String categoryId;
    private String name;
    private String description;
    private String bgColour;
    private Timestamp createdAt;
    private Timestamp updatedAt;
    private String imgUrl;

}
