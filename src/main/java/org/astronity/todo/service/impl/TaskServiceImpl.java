package org.astronity.todo.service.impl;

import org.astronity.todo.dto.CreateTaskDto;
import org.astronity.todo.enums.TaskStatus;
import org.astronity.todo.model.Task;
import org.astronity.todo.repository.TaskRepository;
import org.astronity.todo.service.TaskService;
import org.astronity.todo.specification.TaskSpecification;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class TaskServiceImpl implements TaskService {
    private TaskRepository taskRepository;
    public TaskServiceImpl(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    @Override
    public Task createTask(CreateTaskDto createTaskDto) {
        Task newTask = new Task();
        newTask.setTask(createTaskDto.getTask());
        newTask.setDescription(createTaskDto.getDescription());
        newTask.setStatus(createTaskDto.getStatus());
        newTask.setCreatedAt(LocalDateTime.now());
        return taskRepository.save(newTask);
    }

    @Override
    public Task getTaskById(Long id) {
        return taskRepository.findById(id).orElse(null);
    }

    @Override
    public Task updateTask(Task task) {
        Task existingTask = getTaskById(task.getId());
        existingTask.setTask(task.getTask());
        existingTask.setDescription(task.getDescription());
        existingTask.setStatus(task.getStatus());
        return taskRepository.save(existingTask);
    }

    @Override
    public void deleteTaskById(Long id) {
        Task existingTask = getTaskById(id);
        taskRepository.delete(existingTask);
    }

    @Override
    public Page<Task> getAllTasks(
            String search,
            TaskStatus status,
            Pageable pageable
    ) {
        Specification<Task> specification = Specification
                .where(TaskSpecification.search(search))
                .and(TaskSpecification.hasStatus(status));
        return taskRepository.findAll(specification, pageable);
    }
}
