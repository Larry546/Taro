package com.lhn.travel.controller;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
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
    public List<Ticket> findOne(@PathVariable Integer id) {
        return ticketService.list();
    }

    @GetMapping("/page")
    public Page<Ticket> findPage(@RequestParam Integer pageNum,
                                 @RequestParam Integer pageSize) {
        return ticketService.page(new Page<>(pageNum, pageSize));
    }

    @GetMapping("/listByOrder/{id}")
    public List findByOrder(@PathVariable Integer id) {
        return ticketService.findByOrder(id);
    }

    @GetMapping("/listBySpot/{id}")
    public List findBySpot(@PathVariable Integer id) {
        return ticketService.findBySpot(id);
    }
}

