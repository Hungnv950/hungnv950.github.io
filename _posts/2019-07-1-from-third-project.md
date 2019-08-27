## Những điều thú vị
**From 1/7/2019**

### Regex tìm mọi khoảng trắng unicode tiếng Anh và tiếng Nhật
```
/[[:space:]]|\s+/
```

Sử dụng gem ransack để tìm kiếm với full_name
```
  ransacker :full_name,
    formatter: proc { |v|
      v.gsub(/[[:space:]]|\s+/, "")
    } do |parent|
    Arel::Nodes::NamedFunction.new("CONCAT_WS",
      [
        Arel::Nodes::SqlLiteral.new('""'),
        parent.table[:last_name], parent.table[:first_name]
      ])
  end
```


Change author in commit
```
git filter-branch --commit-filter '
        if [ "$GIT_COMMITTER_NAME" = "<hungnv950>" ];
        then
                GIT_COMMITTER_NAME="<hungbnv-1225>";
                GIT_AUTHOR_NAME="<hungbnv-1225>";
                GIT_COMMITTER_EMAIL="<nguyen.van.hungb@sun-asterisk.com>";
                GIT_AUTHOR_EMAIL="<nguyen.van.hungb@sun-asterisk.com>";
                git commit-tree "$@";
        else
                git commit-tree "$@";
        fi' HEAD
```

```
  scope :wait_admin_approve, lambda {
    candidate = Candidate.arel_table
    flu = Influencer.arel_table
    left_joins(:influencer).where(candidate[:status].eq("applied").and(flu[:company_id].eq(nil)).or(
                                    candidate[:status].eq("office_approved").and(flu[:company_id].not_eq(nil))
                                  ))
  }
```
