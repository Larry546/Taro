package com.lhn.travel.controller;

import com.lhn.travel.entity.Ticket;
import com.lhn.travel.service.ITicketService;
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
@RequestMapping("/ticket")
public class TicketController {

    @Resource
    private ITicketService ticketService;

    @PostMapping("/save")
    public Boolean save(@RequestBody Ticket ticket) {
        return ticketService.saveOrUpdate(ticket);
    }

    @DeleteMapping("/delete/{id}")
    public Boolean delete(@PathVariable Integer id) {
        return ticketService.removeById(id);
    }

    @GetMapping("/list")
    public List<Ticket> findAll() {
        return ticketService.list();
    }

    @GetMapping("/find/{id}")
    public Ticket findOne(@PathVariable Integer id) {
        return ticketService.getById(id);
    }


    @GetMapping("/listByOrder/{id}")
    public List findByOrder(@PathVariable Integer id) {
        return ticketService.findByOrder(id);
    }

    @GetMapping("/listBySpot/{id}")
    public List<Ticket> findBySpot(@PathVariable Integer id) {
        return ticketService.findBySpot(id);
    }
}

