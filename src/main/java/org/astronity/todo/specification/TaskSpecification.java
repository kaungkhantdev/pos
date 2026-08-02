package org.astronity.todo.specification;

import org.astronity.todo.enums.TaskStatus;
import org.astronity.todo.model.Task;
import org.springframework.data.jpa.domain.Specification;

public class TaskSpecification {
    private  TaskSpecification() {
    }

    public static Specification<Task> search(String search) {
        return (root, query, criteriaBuilder) -> {
            if (search == null || search.isEmpty())
                return null;

            String keyword = "%" + search + "%";

            return  criteriaBuilder.or(
                    criteriaBuilder.like(
                            criteriaBuilder.lower(root.get("task")),
                            keyword
                    ),
                    criteriaBuilder.like(
                            criteriaBuilder.lower(root.get("description")),
                            keyword
                    )
            );

        };
    }

    public static Specification<Task> hasStatus(TaskStatus status) {
        return (root, query, criteriaBuilder) -> {
            if (status == null)
                return null;
            return criteriaBuilder.equal(root.get("status"), status);
        };
    }
}
