package org.astronity.pos.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/products")
public class ProductController {
    @GetMapping()
    public String index()
    {
        return "pages/product/list";
    }

    @GetMapping("/{id}")
    public String show()
    {
        return "pages/product/show";
    }

    @GetMapping("/new")
    public String create()
    {
        return "pages/product/create";
    }

    @GetMapping("/{id}/edit")
    public String edit()
    {
        return "pages/product/edit";
    }
}

//@Controller
//@RequestMapping("/posts")
//@RequiredArgsConstructor
//public class PostController {
//
//    private final PostService     postService;
//    private final CommentService  commentService;
//    private final CategoryService categoryService;
//
//    // ─────────────────────────────────────────
//    // GET /posts  →  post/index.html
//    // ─────────────────────────────────────────
//    @GetMapping
//    public String index(
//            @RequestParam(defaultValue = "0")  int page,
//            @RequestParam(defaultValue = "10") int size,
//            @RequestParam(defaultValue = "latest") String sort,
//            Model model) {
//
//        Page<PostResponseDto> posts = postService.findAll(page, size, sort);
//
//        model.addAttribute("posts",       posts.getContent());
//        model.addAttribute("currentPage", posts.getNumber());
//        model.addAttribute("totalPages",  posts.getTotalPages());
//        model.addAttribute("totalPosts",  posts.getTotalElements());
//        model.addAttribute("sort",        sort);
//        model.addAttribute("featuredPost", postService.findFeatured());
//        model.addAttribute("totalComments", commentService.countAll());
//        model.addAttribute("pageTitle",   "Articles");
//        model.addAttribute("activePage",  "posts");
//
//        return "post/index";
//    }
//
//    // ─────────────────────────────────────────
//    // GET /posts/{id}  →  post/show.html
//    // ─────────────────────────────────────────
//    @GetMapping("/{id}")
//    public String show(
//            @PathVariable Long id,
//            @AuthenticationPrincipal CustomUserDetails currentUser,
//            Model model) {
//
//        PostResponseDto post = postService.findById(id);
//
//        boolean isOwner = currentUser != null &&
//                (currentUser.getUsername().equals(post.getAuthorEmail()) ||
//                        currentUser.hasRole("ADMIN"));
//
//        model.addAttribute("post",           post);
//        model.addAttribute("commentRequest", new CommentRequestDto());
//        model.addAttribute("relatedPosts",   postService.findRelated(id, 3));
//        model.addAttribute("isOwner",        isOwner);
//        model.addAttribute("pageTitle",      post.getTitle());
//
//        return "post/show";
//    }
//
//    // ─────────────────────────────────────────
//    // GET /posts/new  →  post/create.html
//    // ─────────────────────────────────────────
//    @GetMapping("/new")
//    @PreAuthorize("hasAnyRole('AUTHOR', 'ADMIN')")
//    public String createForm(Model model) {
//        model.addAttribute("postRequest", new PostRequestDto());
//        model.addAttribute("categories",  categoryService.findAll());
//        model.addAttribute("pageTitle",   "New Post");
//        return "post/create";
//    }
//
//    // ─────────────────────────────────────────
//    // POST /posts  →  handle create form submit
//    // ─────────────────────────────────────────
//    @PostMapping
//    @PreAuthorize("hasAnyRole('AUTHOR', 'ADMIN')")
//    public String create(
//            @Valid @ModelAttribute("postRequest") PostRequestDto dto,
//            BindingResult result,
//            @RequestParam(defaultValue = "publish") String action,
//            @AuthenticationPrincipal CustomUserDetails currentUser,
//            RedirectAttributes redirectAttrs,
//            Model model) {
//
//        if (result.hasErrors()) {
//            model.addAttribute("categories", categoryService.findAll());
//            return "post/create";                          // re-render form with errors
//        }
//
//        dto.setPublished(action.equals("publish"));
//        dto.setAuthorEmail(currentUser.getUsername());
//
//        PostResponseDto saved = postService.save(dto);
//
//        redirectAttrs.addFlashAttribute("successMessage",
//                action.equals("publish") ? "Post published!" : "Draft saved.");
//
//        return "redirect:/posts/" + saved.getId();        // PRG pattern
//    }
//
//    // ─────────────────────────────────────────
//    // GET /posts/{id}/edit  →  post/edit.html
//    // ─────────────────────────────────────────
//    @GetMapping("/{id}/edit")
//    @PreAuthorize("hasAnyRole('AUTHOR', 'ADMIN')")
//    public String editForm(
//            @PathVariable Long id,
//            @AuthenticationPrincipal CustomUserDetails currentUser,
//            Model model) {
//
//        PostResponseDto post = postService.findById(id);
//
//        // only owner or admin can edit
//        if (!currentUser.getUsername().equals(post.getAuthorEmail()) &&
//                !currentUser.hasRole("ADMIN")) {
//            return "redirect:/posts/" + id + "?error=forbidden";
//        }
//
//        model.addAttribute("postRequest", PostMapper.toRequestDto(post));
//        model.addAttribute("categories",  categoryService.findAll());
//        model.addAttribute("pageTitle",   "Edit Post");
//
//        return "post/edit";
//    }
//
//    // ─────────────────────────────────────────
//    // POST /posts/{id}  (PUT override)  →  handle edit submit
//    // ─────────────────────────────────────────
//    @PostMapping("/{id}")
//    @PreAuthorize("hasAnyRole('AUTHOR', 'ADMIN')")
//    public String update(
//            @PathVariable Long id,
//            @Valid @ModelAttribute("postRequest") PostRequestDto dto,
//            BindingResult result,
//            @AuthenticationPrincipal CustomUserDetails currentUser,
//            RedirectAttributes redirectAttrs,
//            Model model) {
//
//        if (result.hasErrors()) {
//            model.addAttribute("categories", categoryService.findAll());
//            return "post/edit";
//        }
//
//        postService.update(id, dto, currentUser);
//
//        redirectAttrs.addFlashAttribute("successMessage", "Post updated successfully.");
//        return "redirect:/posts/" + id;
//    }
//
//    // ─────────────────────────────────────────
//    // POST /posts/{id}  (DELETE override)
//    // ─────────────────────────────────────────
//    @DeleteMapping("/{id}")
//    @PreAuthorize("hasAnyRole('AUTHOR', 'ADMIN')")
//    public String delete(
//            @PathVariable Long id,
//            @AuthenticationPrincipal CustomUserDetails currentUser,
//            RedirectAttributes redirectAttrs) {
//
//        postService.delete(id, currentUser);
//
//        redirectAttrs.addFlashAttribute("successMessage", "Post deleted.");
//        return "redirect:/posts";
//    }
//}