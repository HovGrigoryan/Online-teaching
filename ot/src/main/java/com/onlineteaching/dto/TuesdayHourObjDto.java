package com.onlineteaching.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TuesdayHourObjDto {

   private List<TuesdayHourDto> tuesdayHourList;
   private String tuesday;

}
