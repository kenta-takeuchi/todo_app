class Task < ApplicationRecord
  validates :status, inclusion: { in: %w(Todo, Doing, Done), message: "%{value} のステータスは無効です"}
end
