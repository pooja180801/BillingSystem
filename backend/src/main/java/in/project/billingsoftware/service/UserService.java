package in.project.billingsoftware.service;

import in.project.billingsoftware.io.UserRequest;
import in.project.billingsoftware.io.UserResponse;

import java.util.List;

public interface UserService {
    UserResponse createUser(UserRequest request);
    String getUserRole(String email);
    List<UserResponse> fetchUsers();
    void deleteUser(String id);

}
