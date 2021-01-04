class CreateTasks < ActiveRecord::Migration[6.1]
  def change
    create_table :tasks do |t|
      t.string :title
      t.text :description
      t.string :status
      t.belongs_to :category
      t.integer :user_id
      t.integer :responsible_id
      t.timestamps
    end
    add_foreign_key :tasks, :users, column: :owner_id
    add_foreign_key :tasks, :users, column: :responsible_id
  end
end
