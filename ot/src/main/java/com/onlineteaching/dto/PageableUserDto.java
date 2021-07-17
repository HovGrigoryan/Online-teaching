package com.onlineteaching.dto;

import com.onlineteaching.model.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PageableUserDto {

    int totalPages;
    List<User> userList;

}
