package com.lhn.travel.controller;

import com.lhn.travel.entity.Passenger;
import com.lhn.travel.service.IPassengerService;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;


/**
 * <p>
 * 前端控制器
 * </p>
 *
 * @author lhn
 * @since 2022-03-10
 */
@RestController
@RequestMapping("/passenger")
public class PassengerController {

    @Resource
    private IPassengerService passengerService;

    @PostMapping("/save")
    public Boolean save(@RequestBody Passenger passenger) {
        return passengerService.saveOrUpdate(passenger);
    }

    @GetMapping("/list")
    public List<Passenger> findAll() {
        return passengerService.list();
    }

    @GetMapping("/find/{id}")
    public List<Passenger> findOne(@PathVariable Integer id) {
        return passengerService.list();
    }


    @GetMapping("/listByUser/{uid}")
    public List<Passenger> findByUser(@PathVariable Integer uid) {
        return passengerService.findByUser(uid);
    }

    @DeleteMapping("/delete/{id}")
    public Boolean delete(@PathVariable Integer id) {
        return passengerService.delete(id);
    }

    @GetMapping("/listByOrder/{uid}")
    public List findByOrder(@PathVariable Integer uid) {
        return passengerService.findByOrder(uid);
    }
}

