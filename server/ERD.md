# Database ERD

## Core tables

### `Roles`
- `id` PK, `STRING`
- `roleName`, `STRING`
- `createdAt`, `DATE`
- `updatedAt`, `DATE`

### `Users`
- `id` PK, `STRING`
- `name`, `STRING`
- `phone`, `STRING`
- `email`, `STRING`
- `password`, `STRING`
- `zalo`, `STRING`
- `avatar`, `TEXT`
- `roleId` FK -> `Roles.id`
- `createdAt`, `DATE`
- `updatedAt`, `DATE`

### `Categorys`
Note: the table name stays `Categorys` for compatibility with the current codebase.

- `id` PK, `INTEGER`
- `code`, `STRING`
- `value`, `STRING`
- `header`, `STRING`
- `subheader`, `STRING`
- `createdAt`, `DATE`
- `updatedAt`, `DATE`

### `Attributes`
- `id` PK, `STRING`
- `price`, `STRING`
- `acreage`, `STRING`
- `published`, `STRING`
- `createdAt`, `DATE`
- `updatedAt`, `DATE`

### `Overviews`
- `id` PK, `STRING`
- `code`, `STRING`
- `target`, `STRING`
- `created`, `DATE`
- `expire`, `DATE`
- `bonus`, `TEXT`
- `createdAt`, `DATE`
- `updatedAt`, `DATE`

### `Images`
- `id` PK, `STRING`
- `image`, `STRING`
- `createdAt`, `DATE`
- `updatedAt`, `DATE`

### `Posts`
- `id` PK, `STRING`
- `title`, `STRING`
- `address`, `STRING`
- `attributeId` FK-like ref -> `Attributes.id`
- `categoryCode` FK-like ref -> `Categorys.id`
- `description`, `TEXT`
- `userId` FK-like ref -> `Users.id`
- `overviewId` FK-like ref -> `Overviews.id`
- `imagesId` FK-like ref -> `Images.id`
- `createdAt`, `DATE`
- `updatedAt`, `DATE`

### `password_reset_otps`
- `id` PK, `INTEGER`
- `user_id` FK -> `Users.id`
- `email`, `STRING`
- `otp`, `STRING`
- `expires_at`, `DATE`
- `is_verified`, `BOOLEAN`
- `created_at`, `DATE`
- `updated_at`, `DATE`

## Relationships

- `Roles (1) -> (N) Users`
- `Users (1) -> (N) Posts`
- `Users (1) -> (N) password_reset_otps`
- `Categorys (1) -> (N) Posts`
- `Posts (1) -> (1) Attributes`
- `Posts (1) -> (1) Overviews`
- `Posts (1) -> (0..1) Images`

## Removed redundant schema

- Dropped table `Labels`
- Dropped column `Posts.labelCode`
- Dropped columns `Users.resetToken`, `Users.resetTokenExpired`
- Dropped columns `Overviews.area`, `Overviews.type`

## Notes

- The auth flow uses `password_reset_otps`; a migration was added so the repo now describes that table explicitly.
- `deletePost` now deletes the linked `Attributes`, `Overviews`, and `Images` rows to avoid orphan records.
