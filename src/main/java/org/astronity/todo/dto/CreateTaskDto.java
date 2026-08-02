package org.astronity.todo.dto;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.astronity.todo.enums.TaskStatus;

@Getter
@Setter
@ToString
public class CreateTaskDto {

    @NotBlank(message = "Task is required")
    @Size(max = 100, message = "Task must not exceed 100 characters")
    private String task;

    @NotBlank(message = "Description is required")
    @Size(max = 500, message = "Description must not exceed 500 characters")
    private String description;

    @NotNull(message = "Status is required")
    private TaskStatus status;
}