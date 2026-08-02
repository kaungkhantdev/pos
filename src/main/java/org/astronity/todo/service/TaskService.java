package org.astronity.todo.service;

import org.astronity.todo.dto.CreateTaskDto;
import org.astronity.todo.enums.TaskStatus;
import org.astronity.todo.model.Task;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface TaskService {
    Task createTask(CreateTaskDto createTaskDto);

    Task getTaskById(Long id);

    Task updateTask(Long id, CreateTaskDto createTaskDto);

    void deleteTaskById(Long id);

    Page<Task> getAllTasks(String search, TaskStatus status, Pageable pageable);
}
