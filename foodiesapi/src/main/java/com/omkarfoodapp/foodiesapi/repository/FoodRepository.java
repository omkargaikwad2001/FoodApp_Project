package com.omkarfoodapp.foodiesapi.repository;

import com.omkarfoodapp.foodiesapi.entity.FoodEntity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FoodRepository extends MongoRepository<FoodEntity,String> {


}
