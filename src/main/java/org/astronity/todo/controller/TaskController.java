package org.astronity.todo.controller;

import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.astronity.todo.dto.CreateTaskDto;
import org.astronity.todo.enums.TaskStatus;
import org.astronity.todo.model.Task;
import org.astronity.todo.service.TaskService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@Slf4j
@Controller
@RequestMapping("tasks")
public class TaskController {
    private final TaskService taskService;
    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping
    public String index(
            @RequestParam(required = false) String keyboard,
            @RequestParam(required = false) TaskStatus status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            Model model
            ) {
        Page<Task> tasks = taskService.getAllTasks(
                keyboard,
                status,
                PageRequest.of(page, size, Sort.by(Sort.Direction.ASC, "id"))
        );
        log.info("Tasks found: {}", tasks.getTotalElements());
        model.addAttribute("tasks", tasks);
        model.addAttribute("keyboard", keyboard);
        model.addAttribute("status", status);
        return "pages/task/index";
    }

    @PostMapping
    public String save(@Valid @ModelAttribute CreateTaskDto dto, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return "pages/task/index";
        }

        log.info("Saving task {}", dto);
        taskService.createTask(dto);

        return "redirect:/tasks";
    }
}
